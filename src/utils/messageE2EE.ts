import { MessageType } from "@/components/chat/Message";

export const generateAndExportKeyPair = async () => {
  try {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "ECDH" ,
        namedCurve: "P-256" ,
      },
      true,
      ["deriveKey", "deriveBits"]
    );

    const publicKeyJwk = await window.crypto.subtle.exportKey(
      "jwk",
      keyPair.publicKey
    );
    const privateKeyJwk = await window.crypto.subtle.exportKey(
      "jwk",
      keyPair.privateKey
    );

    return { publicKey: publicKeyJwk, privateKey: privateKeyJwk };
  } catch (error) {
    console.error("Error generating and exporting key pair:", error);
    throw new Error("Failed to generate key pair.");
  }
};

export const deriveSharedSecret = async (
  privateKeyJwk: JsonWebKey,
  recipientPublicKey: JsonWebKey
) => {
  const privateKey = await window.crypto.subtle.importKey(
    "jwk",
    privateKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );
  const recipientKey = await window.crypto.subtle.importKey(
    "jwk",
    recipientPublicKey,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );
  const sharedSecret = await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: recipientKey,
    },
    privateKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  return sharedSecret;
};

export const encryptMessage = async (
  sharedSecret: CryptoKey,
  message: string
) => {
  try {
    const encoder = new TextEncoder();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedMessage = encoder.encode(message);

    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      sharedSecret,
      encodedMessage
    );
    const encryptedDataUint8Array = new Uint8Array(encryptedData);
    return {
      encryptedData: arrayBufferToBase64(encryptedDataUint8Array),
      iv: arrayBufferToBase64(iv),
    };
  } catch (error) {
    console.error("Error encrypting message:", error);
    throw new Error("Failed to encrypt message.");
  }
};

export const decryptMessage = async (
  sharedSecret: CryptoKey,
  encryptedData: string,
  iv: string
) => {
  try {
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToUint8Array(iv),
      },
      sharedSecret,
      base64ToUint8Array(encryptedData)
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error("Error decrypting message:", error);
    throw new Error("Failed to decrypt message.");
  }
};

export const decryptMessageArray = async (
  messageArray: MessageType[],
  sharedSecret: CryptoKey
) => {
  const decryptedMessageArray = messageArray.map(async (message, index) => {
    try {
      message.message = await decryptMessage(
        sharedSecret,
        message.message,
        message.iv
      );
      if (message.repliedMsg?.message) {
        message.repliedMsg.message = await decryptMessage(
          sharedSecret,
          message.repliedMsg.message,
          message.repliedMsg.iv
        );
      }
      return message;
    } catch (error) {
      console.error(`Failed to decrypt message at index ${index}`, error);
      return { ...message, error: "Failed to decrypt" };
    }
  });

  return await Promise.all(decryptedMessageArray);
};

function arrayBufferToBase64(uint8Array: Uint8Array) {
  let binaryString = "";

  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}
function base64ToUint8Array(base64: string) {
  const buffer = Buffer.from(base64, "base64");
  return new Uint8Array(buffer);
}

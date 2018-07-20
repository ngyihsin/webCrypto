// Steps to generate the public json web key,
// 1. openssl genrsa -out Key0.pem -f4 2048
// 2. openssl rsa -in Key0.pem -pubout -out Key0_pub.pem
// 3. pem-jwk Key0_pub.pem
// Download pem-jwk from https://github.com/dannycoates/pem-jwk
const pubJWBKey = {
  "kty": "RSA",
  "n":   "8M8b95thzJY4lhPzH1XIiwu1w6HSm1I_DMkxD9mVgHU1CYxgIoeqJDWdN_lPFBfbV2nBpjRqp-NQiplIZ3Wvi62S0r9yJ25duy8vvZ0tus96cRyIHH0IDuHroYytYITjuUwmoNsmRKL4L9QDoW8GRkRXKR3yC8GGZRBM6V6i-H0OqH_QKtSIPiCDIoASPqnbC_Y0ejUTdu73hOJIaTsjAX8Ewmur2Ff3Hh75Iv-N00GLNSyuoZ-i8xlULxcN9372GqIuEefX8gD6WP6VsGeOmTnYG1aEZWD14VDsIgByNlIgN5T8SG1XPZIsg8uysg3IoR-UKvp5HxcAu9e2fOlfnQ",
  "e":   "AQAB",
};

// Steps to generate the private json web key,
// 1. openssl genrsa -out Key0.pem -f4 2048
// 2. pem-jwk Key0.pem
const privJWBKey = {
    "kty":"RSA",
    "n":  "8M8b95thzJY4lhPzH1XIiwu1w6HSm1I_DMkxD9mVgHU1CYxgIoeqJDWdN_lPFBfbV2nBpjRqp-NQiplIZ3Wvi62S0r9yJ25duy8vvZ0tus96cRyIHH0IDuHroYytYITjuUwmoNsmRKL4L9QDoW8GRkRXKR3yC8GGZRBM6V6i-H0OqH_QKtSIPiCDIoASPqnbC_Y0ejUTdu73hOJIaTsjAX8Ewmur2Ff3Hh75Iv-N00GLNSyuoZ-i8xlULxcN9372GqIuEefX8gD6WP6VsGeOmTnYG1aEZWD14VDsIgByNlIgN5T8SG1XPZIsg8uysg3IoR-UKvp5HxcAu9e2fOlfnQ",
    "e":  "AQAB",
    "d":  "Tjh4NS3bzsDdEKLaTktnIQNkv29JIfrNUDHqJePflCJ-X-OhNpYqxihEMXJiJXy6WuKXbI2KN463Es5HnpOzugNfteVKB1TqTWs-brEnsY7DjwpdjCNxAqSQDaHMj5WbAw2hXo7RF2p4g9CyfTW7LAf25_w6K2dpaFqrIQMEnQIg9Fwg98q1VcWXFh0-KTWDSxfx_FjRVkdaH-zjGxSwJA7UqWzqw9xnrq-fVsKAS4q3EtuMywa_n7IoZv1cvAg-irMR5vl2s81EZh-LgXcAeb5HaohSNerb1s8nWoUG565HwgFxoE5e6A5xDUo1w2Vf7SX9oG2ALwlYURpFaYfQAQ",
    "p":  "_OTYFVAZ7P7kmMH8YX1dWfiiJucFI7d5bKuufoySwhHmBltf2xqwTQIE8IJgLef6dEocCbDHfVZNG9MnuNUWh3hBI9R50S8MSdzfRz-lGB3LzCp6W2EF7iDX-gfb8AqJqTOlLdAvIbz7EsZCvA7cHLFIEVQrynEO516cYdT1d4E",
    "q":  "88REeqOPQLZ-C7ckfiuPgSoW_5Lda8QqNZ64zYSiFi0VqoJZZugXULLcxnVO9YpdFsFH3q46b5zGvD3Zi6phkhksEn0sQCHcosh2EC8eN_C30k39Mo_7xErf6BOk7JzbbIaRYuRgd50ZQHdEPJtdHbdlFzSRrm7Ok5xPjS211h0",
    "dp": "x8sD69KcqN-3OfgHq_2fArWrZZCePtl01KXN9ayZRTlewSbvU-qB3lT6Egjuc1YSSE1EWWOQNzU3NgRcHWo7oksfK29xzhGdY71bqK5ff-4KVAI7KHY-eSL5fk83My0gFMz4cnlGwyDKOsrnbitPOlvU09vrvMQVQjU81w2n4AE",
    "dq": "NmyTfW4XBbO44JS7KRBAse3bxKPdm7noUqBlUj1SkvDt7Wu82iTnT7UfZY-7WUbTEcmFakor8c9m75A_idc4gY3tMRORVaA5yn5HHcXnUUYFRIb1CNzssR6mbwIzyEAdHVXOD-49O3dvs9zs9zsYxxGzGEM8Y12J8Zrsh_C0sGE",
    "qi": "zfZ6lxjqfGxyiyswU_fzidHCik6vehYqnyxDsC7zZhsurUN7s1zxr4_LSMiKAfTHKSBbJ_snwqAmknMac0X3HuwCaBV8YNgJ3kvmyflQ7-ocvT3PebwAjXIi3AX9UOnb62PpxMNMF76Hld0i51It5iwDjwUK-oKY3mGcogolys0",
};

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  let buf = new ArrayBuffer(str.length * 2);
  let bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function encrypt(data) {
  return window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
         .then((key)=>{
           window.key = key;
           const iv = window.crypto.getRandomValues(new Uint8Array(12));
           window.iv = iv;
           return window.crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, str2ab(data));
         })
         .then((cypher) => {
           window.data = ab2str(cypher);
           console.log(cypher);
           return cypher;
         })
         .catch((e)=>{
           console.log(e);
         });
}

function decrypt(cypher, key, iv) {
  return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, cypher)
         .then((message)=>{
           return ab2str(message);
         })
         .catch((e)=>{
           console.log(e);
         });
}

function importPublicKey(key) {
  const algo = {
    name: 'RSA-OAEP',
    hash: { name: 'SHA-256' }
  };
  return window.crypto.subtle.importKey('jwk', key, algo, false, ['wrapKey']);
}

function importPrivateKey(key) {
  const algo = {
    name: 'RSA-OAEP',
    hash: { name: 'SHA-256' }
  };
  return window.crypto.subtle.importKey('jwk', key, algo, false, ['unwrapKey']);
}

function wrapKey(symKey, publicKey)
{
  return window.crypto.subtle.wrapKey('raw', symKey, publicKey, { name: 'RSA-OAEP' });
}

function unWrapKey(wrappedKey, privateKey)
{
  return window.crypto.subtle.unwrapKey('raw', wrappedKey, privateKey, { name: 'RSA-OAEP' }, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
}

// encrypt form input
encrypt("abcdefghijklmnop")
.then((cypher)=>{
  // Import public key
  return importPublicKey(pubJWBKey);
})
.then((publicKey)=>{
  window.publicKey = publicKey;
  return importPrivateKey(privJWBKey);
})
.then((privateKey)=>{
  window.privateKey = privateKey;
  // Wrap the window.key(sym key) using public key.
  return wrapKey(window.key, window.publicKey);
})
.then((wrappedKey)=>{
  // UnWrap key using private key.
  return unWrapKey(wrappedKey, window.privateKey);
})
.then((unwrappedKey)=>{
  // Decryption the data using unwrappedKey.
  return decrypt(str2ab(window.data), unwrappedKey, window.iv)
})
.then((message)=>{
  console.log(message);
})
.catch((e)=>{
  console.log(e);
});



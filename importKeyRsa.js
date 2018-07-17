function convertStringToArrayBufferView(str) {
    var bytes = new Uint8Array(str.length);
    for (var iii = 0; iii < str.length; iii++) {
        bytes[iii] = str.charCodeAt(iii);
    }

    return bytes;
}

// Steps to generate the public json web key,
// 1. openssl genrsa -out Key0.pem -f4 2048
// 2. openssl rsa -in Key0.pem -pubout -out Key0_pub.pem
// 3. pem-jwk Key0_pub.pem
// Download pem-jwk from https://github.com/dannycoates/pem-jwk
var pubJWBKey = {
  "kty": "RSA",
  "n":   "8M8b95thzJY4lhPzH1XIiwu1w6HSm1I_DMkxD9mVgHU1CYxgIoeqJDWdN_lPFBfbV2nBpjRqp-NQiplIZ3Wvi62S0r9yJ25duy8vvZ0tus96cRyIHH0IDuHroYytYITjuUwmoNsmRKL4L9QDoW8GRkRXKR3yC8GGZRBM6V6i-H0OqH_QKtSIPiCDIoASPqnbC_Y0ejUTdu73hOJIaTsjAX8Ewmur2Ff3Hh75Iv-N00GLNSyuoZ-i8xlULxcN9372GqIuEefX8gD6WP6VsGeOmTnYG1aEZWD14VDsIgByNlIgN5T8SG1XPZIsg8uysg3IoR-UKvp5HxcAu9e2fOlfnQ",
  "e":"AQAB",
  "alg": "RS256",
  "ext": true,
};

// Steps to generate the private json web key,
// 1. openssl genrsa -out Key0.pem -f4 2048
// 2. pem-jwk Key0.pem
var privJWBKey = {
    "kty":"RSA",
    "n":  "8M8b95thzJY4lhPzH1XIiwu1w6HSm1I_DMkxD9mVgHU1CYxgIoeqJDWdN_lPFBfbV2nBpjRqp-NQiplIZ3Wvi62S0r9yJ25duy8vvZ0tus96cRyIHH0IDuHroYytYITjuUwmoNsmRKL4L9QDoW8GRkRXKR3yC8GGZRBM6V6i-H0OqH_QKtSIPiCDIoASPqnbC_Y0ejUTdu73hOJIaTsjAX8Ewmur2Ff3Hh75Iv-N00GLNSyuoZ-i8xlULxcN9372GqIuEefX8gD6WP6VsGeOmTnYG1aEZWD14VDsIgByNlIgN5T8SG1XPZIsg8uysg3IoR-UKvp5HxcAu9e2fOlfnQ",
    "e":  "AQAB",
    "d":  "Tjh4NS3bzsDdEKLaTktnIQNkv29JIfrNUDHqJePflCJ-X-OhNpYqxihEMXJiJXy6WuKXbI2KN463Es5HnpOzugNfteVKB1TqTWs-brEnsY7DjwpdjCNxAqSQDaHMj5WbAw2hXo7RF2p4g9CyfTW7LAf25_w6K2dpaFqrIQMEnQIg9Fwg98q1VcWXFh0-KTWDSxfx_FjRVkdaH-zjGxSwJA7UqWzqw9xnrq-fVsKAS4q3EtuMywa_n7IoZv1cvAg-irMR5vl2s81EZh-LgXcAeb5HaohSNerb1s8nWoUG565HwgFxoE5e6A5xDUo1w2Vf7SX9oG2ALwlYURpFaYfQAQ",
    "p":  "_OTYFVAZ7P7kmMH8YX1dWfiiJucFI7d5bKuufoySwhHmBltf2xqwTQIE8IJgLef6dEocCbDHfVZNG9MnuNUWh3hBI9R50S8MSdzfRz-lGB3LzCp6W2EF7iDX-gfb8AqJqTOlLdAvIbz7EsZCvA7cHLFIEVQrynEO516cYdT1d4E",
    "q":  "88REeqOPQLZ-C7ckfiuPgSoW_5Lda8QqNZ64zYSiFi0VqoJZZugXULLcxnVO9YpdFsFH3q46b5zGvD3Zi6phkhksEn0sQCHcosh2EC8eN_C30k39Mo_7xErf6BOk7JzbbIaRYuRgd50ZQHdEPJtdHbdlFzSRrm7Ok5xPjS211h0",
    "dp": "x8sD69KcqN-3OfgHq_2fArWrZZCePtl01KXN9ayZRTlewSbvU-qB3lT6Egjuc1YSSE1EWWOQNzU3NgRcHWo7oksfK29xzhGdY71bqK5ff-4KVAI7KHY-eSL5fk83My0gFMz4cnlGwyDKOsrnbitPOlvU09vrvMQVQjU81w2n4AE",
    "dq": "NmyTfW4XBbO44JS7KRBAse3bxKPdm7noUqBlUj1SkvDt7Wu82iTnT7UfZY-7WUbTEcmFakor8c9m75A_idc4gY3tMRORVaA5yn5HHcXnUUYFRIb1CNzssR6mbwIzyEAdHVXOD-49O3dvs9zs9zsYxxGzGEM8Y12J8Zrsh_C0sGE",
    "qi": "zfZ6lxjqfGxyiyswU_fzidHCik6vehYqnyxDsC7zZhsurUN7s1zxr4_LSMiKAfTHKSBbJ_snwqAmknMac0X3HuwCaBV8YNgJ3kvmyflQ7-ocvT3PebwAjXIi3AX9UOnb62PpxMNMF76Hld0i51It5iwDjwUK-oKY3mGcogolys0",
    "alg": "RS256",
    "ext": true,
};

window.crypto.subtle.importKey(
    "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
    privJWBKey,
    {   //these are the algorithm options
        name: "RSASSA-PKCS1-v1_5",
        hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
    },
    false, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign"] //"verify" for public key import, "sign" for private key imports
)
.then(function(privateKey){
  //returns a publicKey (or privateKey if you are importing a private key)
  window.data = convertStringToArrayBufferView("Hello World");
  console.log(privateKey);
  window.crypto.subtle.sign(
    {
      name: "RSASSA-PKCS1-v1_5",
    },
    privateKey, //from generateKey or importKey above
    data //ArrayBuffer of data you want to sign
  )
  .then(function(signature){
    //returns an ArrayBuffer containing the signature
    window.signature = new Uint8Array(signature);
    console.log(window.signature);
    window.crypto.subtle.importKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      pubJWBKey,
      { //these are the algorithm options
        name: "RSASSA-PKCS1-v1_5",
        hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      ["verify"] //"verify" for public key import, "sign" for private key imports
    )
    .then(function(publicKey) {
      window.crypto.subtle.verify(
        {
          name: "RSASSA-PKCS1-v1_5",
        },
        publicKey, //from generateKey or importKey above
        window.signature, //ArrayBuffer of the signature
        window.data //ArrayBuffer of the data
      )
      .then(function(isValid){
        console.log(isValid);
      })
      .catch(function(){
        console.error(err);
      });
    })
  })
  .catch(function(err){
    console.error(err);
  });
})
.catch(function(err){
    console.error(err);
});
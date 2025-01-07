const otpStore = {};
const sendMail = async (email,otp) => {
  const response = await fetch("http://rock-bishop-auth.onrender.com/api/auth/verifyUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email,otp }),
  });
  const json = await response.json();
  return json.message;
};
const generateOTP = (mail) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  storeOTP(mail,otp);
  return sendMail(mail,otp);
};

const storeOTP = (mail, otp) => {
  otpStore[mail] = otp;
  setTimeout(() => {
    delete otpStore[mail];
  }, 5 * 60 * 1000);
};

const otpChecker = (mail, otp) => {
  return otpStore[mail] === otp;
};
export {  otpChecker,generateOTP };

export const initOTPless = (callback) => {
    const otplessInit = Reflect.get(window, "otplessInit");

    const loadScript = () => {
        const isScriptLoaded = document.getElementById("otpless-sdk");
        if (isScriptLoaded) return;

        const script = document.createElement('script')
        script.id = 'otpless-sdk'
        script.type = 'text/javascript'
        script.src = 'https://otpless.com/v2/auth.js'
        script.setAttribute("data-appid", "LL0Y1MD76HQRN7TB4FFB")
        document.body.appendChild(script);
    };

    otplessInit ? otplessInit() : loadScript();

    Reflect.set(window, "otpless", callback);
};
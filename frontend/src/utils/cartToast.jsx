export const showToast = (msg) => {
    const toast = document.createElement("div");

    toast.innerText = msg;
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "20px";
    toast.style.background = "#111";
    toast.style.color = "#fff";
    toast.style.padding = "14px 24px";
    toast.style.borderRadius = "12px";
    toast.style.zIndex = "9999";
    toast.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.3)";
    toast.style.borderLeft =
        "5px solid #f1c40f";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
};


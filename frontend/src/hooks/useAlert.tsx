import Swal from "sweetalert2";
interface Pram {
  title: string;
  text: string;
}

export const useError = (comfirm: Pram) => {
  Swal.fire({
    title: `${comfirm.title}`,
    text: `${comfirm.text}`,
    icon: "warning",
    confirmButtonText: "Ok",
    buttonsStyling: false,
    customClass: {
      popup: "w-72 h-56 pb-1 rounded-3xl text-xs grid-rows-12",
      icon: "my-3 row-start-2 row-end-6",
      title: "h-7 py-1 text-xl font-bold row-start-7 row-end-7",
      htmlContainer: "h-5 m-0 row-start-8 row-end-8",
      actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
      confirmButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
    },
  });
};

export const useError2 = (comfirm: Pram) => {
  Swal.fire({
    title: `${comfirm.title}`,
    text: `${comfirm.text}`,
    icon: "warning",
    confirmButtonText: "Ok",
    buttonsStyling: false,
    customClass: {
      popup: "w-[300px] h-56 pb-1 rounded-3xl text-xs grid-rows-12",
      icon: "my-3 row-start-2 row-end-6",
      title: "h-7 py-1 text-xl font-bold row-start-7 row-end-7",
      htmlContainer: "h-5 m-0 row-start-8 row-end-8",
      actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
      confirmButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
    },
  });
};
export const useSuccessAlert = (title: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: title,
  });
};

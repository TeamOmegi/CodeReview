import Swal from "sweetalert2";
interface Pram {
  title?: string;
  fireText?: string;
  resultText?: string;
}

export const useQuestion = async (comfirm: Pram): Promise<boolean> => {
  const result = await Swal.fire({
    title: `${comfirm.title}`,
    text: `${comfirm.fireText}`,
    icon: "question",
    showCancelButton: true,
    // confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    buttonsStyling: false,
    reverseButtons: true,
    customClass: {
      popup: "w-80 h-64 pb-1 rounded-3xl text-xs grid-rows-12",
      icon: "my-3 row-start-2 row-end-6",
      title: "h-7 py-1 text-xl font-bold row-start-7 row-end-7",
      htmlContainer: "h-5 m-0 row-start-8 row-end-8",
      actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
      confirmButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
      cancelButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#F2527D] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#F2527D] hover:duration-300",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${comfirm.title}`,
        text: `${comfirm.resultText}`,
        icon: "success",
        buttonsStyling: false,
        customClass: {
          popup: "w-80 h-64 pb-1 rounded-3xl text-xs grid-rows-12",
          icon: "my-3 row-start-2 row-end-6",
          title: "h-7 py-1 text-xl font-bold row-start-7 row-end-7",
          htmlContainer: "h-5 m-0 row-start-8 row-end-8",
          actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
          confirmButton:
            "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
        },
      });
      return true;
    } else return false;
  });
  return result;
};

export const useWarnning = async (comfirm: Pram): Promise<boolean> => {
  const result = await Swal.fire({
    title: `${comfirm.title}`,
    text: `${comfirm.fireText}`,
    icon: "warning",
    showCancelButton: true,
    // confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    buttonsStyling: false,
    reverseButtons: true,
    customClass: {
      popup: "w-80 h-64 pb-1 rounded-3xl text-xs grid-rows-12",
      icon: "my-3 row-start-2 row-end-6",
      title: "h-7 py-1 text-xl font-bold row-start-7 row-end-7",
      htmlContainer: "h-5 m-0 row-start-8 row-end-8",
      actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
      confirmButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
      cancelButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#F2527D] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#F2527D] hover:duration-300",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${comfirm.title}`,
        text: `${comfirm.resultText}`,
        icon: "success",
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
      return true;
    } else return false;
  });
  return result;
};

export const useWarnning2 = async (comfirm: Pram): Promise<boolean> => {
  const result = await Swal.fire({
    title: `${comfirm.title}`,
    text: `${comfirm.fireText}`,
    icon: "warning",
    showCancelButton: true,
    // confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    buttonsStyling: false,
    reverseButtons: true,
    customClass: {
      popup: "w-80 h-64 pb-1 rounded-3xl text-xs grid-rows-12",
      icon: "my-3 row-start-2 row-end-6",
      title: "h-7 py-1 text-xl font-bold row-start-7 row-end-8",
      htmlContainer: "h-5 m-0 row-start-8 row-end-9",
      actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
      confirmButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
      cancelButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#F2527D] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#F2527D] hover:duration-300",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else return false;
  });
  return result;
};

export const useDanger = async (comfirm: Pram): Promise<boolean> => {
  const result = await Swal.fire({
    title: `${comfirm.title}`,
    text: `${comfirm.fireText}`,
    icon: "error",
    showCancelButton: true,
    // confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    buttonsStyling: false,
    reverseButtons: true,
    customClass: {
      popup: "w-80 h-64 pb-1 rounded-3xl text-xs grid-rows-12",
      icon: "my-3 row-start-2 row-end-6",
      title: "h-7 py-1 text-xl font-bold row-start-7 row-end-8",
      htmlContainer: "h-5 m-0 row-start-8 row-end-9",
      actions: "w-52 h-8 mt-2 flex row-start-10 row-end-11",
      confirmButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#77af9c] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#77af9c] hover:duration-300",
      cancelButton:
        "bg-main-200 hover:text-main-200 flex h-8 w-16 mx-2 select-none items-center justify-center rounded-xl border-[2px] border-[#F2527D] text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:cursor-pointer hover:bg-[#F2527D] hover:duration-300",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else return false;
  });
  return result;
};

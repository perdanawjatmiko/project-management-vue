import Swal from 'sweetalert2'

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  })
}

export const showErrorNotif = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: message,
  })
}

export const confirmDelete = async (itemName = 'this item'): Promise<boolean> => {
  const result = await Swal.fire({
    title: `Are you sure?`,
    text: `You are about to delete ${itemName}. This action cannot be undone!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
  })

  return result.isConfirmed
}

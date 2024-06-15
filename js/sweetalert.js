function clickBtn(){

    Swal.fire({
        title: "Descuento exclusivo",
        showDenyButton: true,
        text: "Para acceder a la promoción, debe aprobar este trabajo práctico",
        confirmButtonText: "Aprobar",
        denyButtonText: `Desaprobar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("¡Cupon de 50% de descuento!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("No accediste al descuento", "", "error");
        }
      });

}
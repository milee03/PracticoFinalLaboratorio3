var urlGeneric = 'https://api.yumserver.com/16752/generic/clientes';
document.addEventListener('DOMContentLoaded', function() {
    var tablaClientes = document.getElementById('contenedorTabla');

    // MUESTRA TODOS LOS CLIENTES AL CARGAR LA PÁGINA
    tablaClientes.style.display = 'block';
    fetch(urlGeneric)
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error');
        }
        return response.json();
    })
    .then(clientes => {
        MostrarProductos(clientes);
    })
    .catch(error => console.error('Error:', error));

    // FILTRAR CLIENTES POR NOMBRE AL PRESIONAR EL BOTÓN DE FILTRO
    document.getElementById('btnfiltro').addEventListener('click', function(){
        tablaClientes.style.display = 'block';
        var nombreBusqueda = document.getElementById('filtro').value.trim();

        fetch(urlGeneric)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error');
            }
            return response.json();
        })
        .then(clientes => {
            // FILTRAR POR EL NOMBRE BUSCADO
            if (nombreBusqueda !== '') {
                clientes = clientes.filter(cliente => cliente.param1.toLowerCase().includes(nombreBusqueda.toLowerCase()));
                MostrarProductos(clientes);
            }
            else {
                MostrarProductos(clientes);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function FormateoImportes(importe) {
        const partes = Number(importe).toFixed(2).split('.');
        const pesos = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${pesos},${partes[1]}`;
    }

    function MostrarProductos(clientes) {
        console.log(clientes)
        let html = ``;
        let htmlmensaje = ``;
        for (let i = 0; i < clientes.length; i++) {
            const precioCompraFormateado = FormateoImportes(clientes[i].param3);
            const precioPagadoFormateado = FormateoImportes(clientes[i].param4);
            const precioDeudaFormateado = FormateoImportes(clientes[i].param3 - clientes[i].param4);

            html += `
                <tr style='height: 50px;'>
                    <td>${clientes[i].idcod}</td>
                    <td>${clientes[i].param1}</td>
                    <td>$ ${precioCompraFormateado}</td>
                    <td>$ ${precioPagadoFormateado}</td>
                    <td>$ ${precioDeudaFormateado}</td>
                    <td>
                        <button class='eliminar btn btn-danger' data-idcod='${clientes[i].idcod}' type='button' abbr title='Eliminar producto'><i class='fa-solid fa-trash'></i></button>
                    </td>
                </tr>
            `;
        }

        if(clientes.length <= 0){
            htmlmensaje += `
             <div class='alert alert-warning'>No hay registros de clientes</div>
            `;
        }

        document.getElementById('clientesCargados').innerHTML = html;
        document.getElementById('mensaje').innerHTML = htmlmensaje;

        let botonesEliminar = document.querySelectorAll('.eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', function() {
                let idCliente = this.getAttribute('data-idcod');
                eliminarProducto(idCliente);
            });
        });
    }

    document.getElementById('btnCliente').addEventListener('click', function(){
        window.location.href = 'newclients.html'; 
    });

    function eliminarProducto(idCliente) {
        if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idcod: idCliente })
            };
    
            fetch(urlGeneric, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Cliente eliminado exitosamente');
                window.location.href = 'clients.html';
            })
            .catch(error => {
                console.error('Error al eliminar el cliente:', error);
                alert('Ocurrió un error al intentar eliminar el cliente.');
            });
        } else {
            console.log('Operación de eliminación cancelada por el usuario');
        }
    }
  
});


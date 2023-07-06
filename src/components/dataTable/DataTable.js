import DataTable from 'react-data-table-component';

function DataTableComponent({ data, onPageChange }) {
    // Maneja el evento de cambio de página
    const handlePageChange = (page) => {
        onPageChange(page)
    };

    const columns = [
        {
            name: "id",
            selector: row => row.id,
            cell: row => <div className="table-column">{row.id}</div>
        },
        {
            name: "Riesgo",
            selector: row => row.risk,
            cell: row => <div className="table-column">{row.risk}</div>
        },
        {
            name: "Titulo",
            selector: row => row.title,
            cell: row => <div className="table-column">{row.title}</div>
        },
        {
            name: "Descripción",
            selector: row => row.description,
            cell: row => <div className="table-column">{row.description}</div>
        },
        {
            name: "Impacto",
            selector: row => row.impact,
            cell: row => <div className="table-column">{row.impact}</div>
        },
        {
            name: "Probabilidad",
            selector: row => row.probability,
            cell: row => <div className="table-column">{row.probability}</div>
        },
        {
            name: "Fecha creación",
            selector: row => row.created_at,
            cell: row => <div className="table-column">{row.created_at}</div>
        },
        {
            name: "Fecha actualización",
            selector: row => row.updated_at,
            cell: row => <div className="table-column">{row.updated_at}</div>
        },
        {
            name: "User",
            selector: row => row.email,
            cell: row => <div className="table-column">{row.email}</div>
        }
    ]
    
    const paginationOptions = {
        rowsPerPageText: 'Filas por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <div className='container'>
        <DataTable
            columns={columns}
            data={data.data}
            pagination
            paginationServer
            paginationTotalRows={data.meta.total_count} 
            onChangePage={handlePageChange} // Evento de cambio de página
            paginationComponentOptions={paginationOptions}
            paginationPerPage={5} 
        />
        </div>
    );
}

export default DataTableComponent;

import { QTableProps } from 'quasar'

export const vehicleColumns: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    name: 'plate',
    label: 'Placa',
    field: 'plate',
    sortable: true,
  },
  {
    name: 'model',
    label: 'Modelo',
    field: 'model',
    sortable: true,
  },
  {
    name: 'modelYear',
    label: 'Ano Modelo',
    field: 'modelYear',
    sortable: true,
  },
  {
    name: 'color',
    label: 'Cor',
    field: 'color',
    sortable: true,
  },
  {
    name: 'renavam',
    label: 'Renavam',
    field: 'renavam',
    sortable: true,
  },
  {
    name: 'chassisNumber',
    label: 'Chassi',
    field: 'chassisNumber',
    sortable: true,
  },
  {
    name: 'fabricationYear',
    label: 'Ano Fabricação',
    field: 'fabricationYear',
    sortable: true,
  },
]

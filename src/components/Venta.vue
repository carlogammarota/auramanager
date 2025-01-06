<template>
  <FormulateForm
    v-model="formulario"
    @submit="enviarFormulario"
  >
    <div v-for="(venta, index) in formulario.ventas" :key="index" class="venta-item">
      <FormulateInput
        type="select"
        v-model="venta.nombre"
        @input="actualizarValor(index)"
        :options="opcionesBebidas"
        label="Nombre de la Bebida"
      />

      <FormulateInput
        type="number"
        v-model="venta.cantidad"
        label="Cantidad"
      />

      <FormulateInput
        type="text"
        v-model="venta.valor"
        label="Valor ($)"
        readonly
      />

      <FormulateInput
        type="textarea"
        v-model="venta.notas"
        label="Notas"
      />
    </div>

    <button type="button" @click="agregarVenta">+ Agregar Venta</button>
    <FormulateInput
      type="submit"
      label="Enviar"
    />
  </FormulateForm>
</template>

<script>
export default {
  data() {
    return {
      formulario: {
        ventas: [{ nombre: '', cantidad: 1, valor: 0, notas: '' }]
      },
      preciosBebidas: {
        'Gin Tonic 500ml': 5.00,
        'Gin Tonic 1L': 10.00,
        // ... otros precios
      },
    };
  },
  computed: {
    opcionesBebidas() {
      return Object.keys(this.preciosBebidas).reduce((opciones, bebida) => {
        opciones[bebida] = bebida;
        return opciones;
      }, {});
    }
  },
  methods: {
    actualizarValor(index) {
      const bebidaSeleccionada = this.formulario.ventas[index].nombre;
      this.formulario.ventas[index].valor = this.preciosBebidas[bebidaSeleccionada] || 0;
    },
    agregarVenta() {
      this.formulario.ventas.push({ nombre: '', cantidad: 1, valor: 0, notas: '' });
    },
    enviarFormulario() {
      console.log('Formulario enviado:', this.formulario);
      // Aquí puedes agregar la lógica para enviar los datos a un servidor, por ejemplo.
    }
  }
};
</script>

<style>
.venta-item {
  margin-bottom: 20px;
}
</style>

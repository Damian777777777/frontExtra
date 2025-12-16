import React, { useEffect, useState } from "react";
import {
  getMovimientos,
  saveMovimiento,
  deleteMovimiento
} from "../../services/movimientos";

import { getInventario } from "../../services/inventario";

import "./movimientos.css";

export default function MovimientosPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    id: "",
    inventarioId: "",
    tipoMovimiento: "",
    cantidad: "",
    usuario: "",
    descripcion: ""
  });

  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos");

  const cargar = () => {
    getMovimientos().then(setMovimientos);
    getInventario().then(setInventario);
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirNuevo = () => {
    setForm({
      id: "",
      inventarioId: "",
      tipoMovimiento: "",
      cantidad: "",
      usuario: "",
      descripcion: ""
    });
    setModal(true);
  };

  const guardar = () => {
    saveMovimiento({
      inventarioId: form.inventarioId,
      tipoMovimiento: form.tipoMovimiento,
      cantidad: Number(form.cantidad),
      usuario: form.usuario,
      descripcion: form.descripcion
    }).then(() => {
      setModal(false);
      cargar();
    });
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar este movimiento?")) return;
    deleteMovimiento(id).then(() => cargar());
  };

  const filtrados = movimientos
    .filter(m => 
      (m.inventarioProducto.toLowerCase().includes(busqueda.toLowerCase()) ||
       String(m.id).includes(busqueda)) &&
      (filtroActivo === "todos" || 
       (filtroActivo === "activo" && m.tipoMovimiento.startsWith("Entrada")) ||
       (filtroActivo === "inactivo" && m.tipoMovimiento.startsWith("Salida")))
    );

  return (
    <div className="page-container">
      <h2 className="titulo">Movimientos</h2>

      <div className="controls">
        <button className="btn-primary" onClick={abrirNuevo}>➕ Nuevo Movimiento</button>

        <input
          type="text"
          className="input search"
          placeholder="Buscar por ID o Producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        <select
          className="input"
          value={filtroActivo}
          onChange={e => setFiltroActivo(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="activo">Entradas</option>
          <option value="inactivo">Salidas</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Tipo Movimiento</th>
              <th>Cantidad</th>
              <th>Usuario</th>
              <th>Descripción</th>
              <th>Fecha/Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.inventarioProducto}</td>
                <td
                  className={
                    m.tipoMovimiento.startsWith("Entrada")
                      ? "tag tag-green"
                      : "tag tag-red"
                  }
                >
                  {m.tipoMovimiento}
                </td>
                <td>{m.cantidad}</td>
                <td>{m.usuario}</td>
                <td>{m.descripcion}</td>
                <td>{m.fechaHora}</td>
                <td>
                  <button className="btn-danger" onClick={() => eliminar(m.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Nuevo Movimiento</h3>

            <select
              className="input"
              value={form.inventarioId}
              onChange={e => setForm({ ...form, inventarioId: e.target.value })}
            >
              <option value="">Selecciona un producto</option>
              {inventario.map(p => (
                <option key={p.id} value={p.id}>{p.productoNombre}</option>
              ))}
            </select>

            <select
              className="input"
              value={form.tipoMovimiento}
              onChange={e => setForm({ ...form, tipoMovimiento: e.target.value })}
            >
              <option value="">Tipo de Movimiento</option>
              <option value="EntradaProveedor">Entrada Proveedor</option>
              <option value="SalidaVenta">Salida Venta</option>
              <option value="SalidaMerma">Salida Merma</option>
              <option value="SalidaDiversa">Salida Diversa</option>
            </select>

            <input
              type="number"
              className="input"
              placeholder="Cantidad"
              value={form.cantidad}
              onChange={e => setForm({ ...form, cantidad: e.target.value })}
            />

            <input
              type="text"
              className="input"
              placeholder="Usuario"
              value={form.usuario}
              onChange={e => setForm({ ...form, usuario: e.target.value })}
            />

            <input
              type="text"
              className="input"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="btn-primary" onClick={guardar}>Guardar</button>
              <button className="btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

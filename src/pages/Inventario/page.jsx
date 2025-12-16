import React, { useEffect, useState } from "react";
import {
  getInventario,
  getInventarioById,
  saveInventario,
  deleteInventario,
  activarInventario,
  desactivarInventario,
} from "../../services/inventario";
import { getProductos } from "../../services/productos";
import "./inventario.css";

export default function InventarioPage() {
  const [inventario, setInventario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [modal, setModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos");

  const [form, setForm] = useState({
    id: "",
    productoId: "",
    existencia: 0,
    stockMaximo: 0,
    activo: true,
  });

  const cargar = () => {
    getInventario().then(setInventario);
    getProductos().then(setProductos);
  };

  useEffect(() => {
    cargar();
  }, []);

  /* ===============================
     STOCK MÍNIMO = 20% (VISUAL)
  =============================== */
  const stockMinimoCalculado = Math.round(
    Number(form.stockMaximo || 0) * 0.2
  );

  const abrirNuevo = () => {
    setForm({
      id: "",
      productoId: "",
      existencia: 0,
      stockMaximo: 0,
      activo: true,
    });
    setModal(true);
  };

  const abrirEditar = (id) => {
    getInventarioById(id).then((i) => {
      setForm({
        id: i.id,
        productoId: i.productoId,
        existencia: i.existencia,
        stockMaximo: i.stockMaximo,
        activo: i.activo,
      });
      setModal(true);
    });
  };

  /* ===============================
     VALIDACIONES + GUARDAR
  =============================== */
  const guardar = () => {
    if (!form.productoId) {
      alert("Selecciona un producto");
      return;
    }

    if (form.stockMaximo <= 0) {
      alert("El stock máximo debe ser mayor a 0");
      return;
    }

    if (form.existencia < 0) {
      alert("La existencia no puede ser negativa");
      return;
    }

    if (form.existencia > form.stockMaximo) {
      alert("La existencia no puede ser mayor al stock máximo");
      return;
    }

    saveInventario(
      {
        productoId: form.productoId,
        existencia: Number(form.existencia),
        stockMaximo: Number(form.stockMaximo),
        activo: form.activo,
      },
      form.id
    ).then(() => {
      setModal(false);
      cargar();
    });
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar registro de inventario?")) return;
    deleteInventario(id).then(() => cargar());
  };

  const filtrarInventario = () => {
    return inventario.filter((i) => {
      const texto = busqueda.toLowerCase();
      const coincideBusqueda =
        i.productoNombre.toLowerCase().includes(texto) ||
        i.id.toString().includes(texto);

      const coincideActivo =
        filtroActivo === "todos"
          ? true
          : filtroActivo === "activo"
          ? i.activo
          : !i.activo;

      return coincideBusqueda && coincideActivo;
    });
  };

  return (
    <div className="page-container">
      <h2 className="titulo">Inventario</h2>

      <div className="controls">
        <button className="btn-primary" onClick={abrirNuevo}>
          ➕ Nuevo Registro
        </button>

        <input
          className="input-search"
          placeholder="Buscar por producto o ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="input-select"
          value={filtroActivo}
          onChange={(e) => setFiltroActivo(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Existencia</th>
              <th>Mínimo</th>
              <th>Máximo</th>
              <th>Estado</th>
              <th>Última Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtrarInventario().map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.productoNombre}</td>
                <td>{i.existencia}</td>
                <td>{i.stockMinimo}</td>
                <td>{i.stockMaximo}</td>
                <td
                  className={
                    i.estadoInventario === "BAJO"
                      ? "tag tag-red"
                      : i.estadoInventario === "SOBRANTE"
                      ? "tag tag-yellow"
                      : "tag tag-green"
                  }
                >
                  {i.estadoInventario}
                </td>
                <td>{i.fechaActualizacion}</td>
                <td className="action-buttons">
                  <button
                    className="btn-warning"
                    onClick={() => abrirEditar(i.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => eliminar(i.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className={i.activo ? "btn-activo" : "btn-inactivo"}
                    onClick={() =>
                      i.activo
                        ? desactivarInventario(i.id).then(cargar)
                        : activarInventario(i.id).then(cargar)
                    }
                  >
                    {i.activo ? "Activo" : "Inactivo"}
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
            <h3>{form.id ? "Editar Inventario" : "Nuevo Inventario"}</h3>

            <select
              className="input"
              value={form.productoId}
              onChange={(e) =>
                setForm({ ...form, productoId: e.target.value })
              }
            >
              <option value="">Selecciona un producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="0"
              className="input"
              placeholder="Existencia"
              value={form.existencia}
              onChange={(e) =>
                setForm({
                  ...form,
                  existencia: Math.max(0, e.target.value),
                })
              }
            />

            <input
              type="number"
              min="0"
              className="input"
              placeholder="Stock Máximo"
              value={form.stockMaximo}
              onChange={(e) =>
                setForm({
                  ...form,
                  stockMaximo: Math.max(0, e.target.value),
                })
              }
            />

            {/* STOCK MÍNIMO (SOLO LECTURA) */}
            <input
              className="input"
              value={`Stock mínimo (20%): ${stockMinimoCalculado}`}
              disabled
            />

            <label className="check">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) =>
                  setForm({ ...form, activo: e.target.checked })
                }
              />
              Activo
            </label>

            <div className="modal-buttons">
              <button className="btn-primary" onClick={guardar}>
                Guardar
              </button>
              <button
                className="btn-secondary"
                onClick={() => setModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

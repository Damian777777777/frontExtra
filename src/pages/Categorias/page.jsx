import React, { useEffect, useState } from "react";
import {
  getCategorias,
  saveCategoria,
  deleteCategoria,
  getCategoria,
  activarCategoria,
  desactivarCategoria,
} from "../../services/categorias";
import "./categorias.css";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    id: "",
    codigo: "",
    nombre: "",
    precio: "",
    marca: "",
    activo: true,
  });

  const cargar = () => {
    getCategorias().then(setCategorias);
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirNueva = () => {
    setForm({
      id: "",
      codigo: "",
      nombre: "",
      precio: "",
      marca: "",
      activo: true,
    });
    setModal(true);
  };

  const abrirEditar = (id) => {
    getCategoria(id).then((c) => {
      setForm(c);
      setModal(true);
    });
  };

  const guardar = () => {
    saveCategoria(form, form.id).then(() => {
      cargar();
      setModal(false);
    });
  };

  const eliminar = (id) => {
    if (!window.confirm("¿Eliminar categoría?")) return;
    deleteCategoria(id).then(cargar);
  };

  const cambiarEstado = (cat) => {
    if (cat.activo) {
      desactivarCategoria(cat.id).then(cargar);
    } else {
      activarCategoria(cat.id).then(cargar);
    }
  };

  return (
    <div className="page-container">
      <h2 className="titulo">Gestión de Categorías</h2>

      <button className="btn-primary" onClick={abrirNueva}>
        ➕ Nueva Categoría
      </button>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.codigo}</td>
                <td>{c.nombre}</td>

                <td>
                  <button
                    className={`estado-btn ${c.activo ? "activo" : "inactivo"}`}
                    onClick={() => cambiarEstado(c)}
                  >
                    {c.activo ? "Activo" : "Inactivo"}
                  </button>
                </td>

                <td>
                  <button className="btn-warning" onClick={() => abrirEditar(c.id)}>
                    Editar
                  </button>
                  <button className="btn-danger" onClick={() => eliminar(c.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>{form.id ? "Editar Categoría" : "Nueva Categoría"}</h3>

            <input
              className="input"
              placeholder="Código"
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
            />

            <input
              className="input"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />

            <label className="check">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              />
              Activo
            </label>

            <div className="modal-buttons">
              <button className="btn-primary" onClick={guardar}>
                Guardar
              </button>
              <button className="btn-secondary" onClick={() => setModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

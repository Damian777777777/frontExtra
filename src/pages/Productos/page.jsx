import React, { useEffect, useState } from "react";
import {
  getProductos,
  saveProducto,
  deleteProducto,
  getProducto,
  activarProducto,
  desactivarProducto,
} from "../../services/productos";

import { getCategorias } from "../../services/categorias";

import "./productos.css";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    id: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    marca: "",
    categoriaId: "",
    activo: true,
  });

  const cargar = () => {
    getProductos().then(setProductos);
    getCategorias().then(setCategorias);
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirNuevo = () => {
    setForm({
      id: "",
      codigo: "",
      nombre: "",
      descripcion: "",
      precio: "",
      marca: "",
      categoriaId: "",
      activo: true,
    });
    setModal(true);
  };

  const abrirEditar = (id) => {
    getProducto(id).then((p) => {
      setForm({
        id: p.id,
        codigo: p.codigo,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        marca: p.marca,
        categoriaId: p.categoriaId,  // ✔ CORRECTO
        activo: p.activo,
      });
      setModal(true);
    });
  };

  const guardar = () => {
    saveProducto(
      {
        ...form,
        categoriaId: Number(form.categoriaId), // ✔ BACK LO USA COMO long
      },
      form.id
    ).then(() => {
      setModal(false);
      cargar();
    });
  };

  const eliminar = (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    deleteProducto(id).then(() => cargar());
  };

  const toggleActivo = (p) => {
    if (p.activo) {
      desactivarProducto(p.id).then(cargar);
    } else {
      activarProducto(p.id).then(cargar);
    }
  };

  return (
    <div className="page-container">
      <h2 className="titulo">Gestión de Productos</h2>

      <button className="btn-primary" onClick={abrirNuevo}>➕ Nuevo Producto</button>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Marca</th>
              <th>Categoría</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.marca}</td>

                {/* ✔ USAR EL DTO CORRECTO */}
                <td>{p.categoriaNombre}</td>

                <td>
                  <button
                    className={p.activo ? "btn-activo" : "btn-inactivo"}
                    onClick={() => toggleActivo(p)}
                  >
                    {p.activo ? "Activo" : "Inactivo"}
                  </button>
                </td>

                <td>
                  <button className="btn-warning" onClick={() => abrirEditar(p.id)}>
                    Editar
                  </button>

                  <button className="btn-danger" onClick={() => eliminar(p.id)}>
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

            <h3>{form.id ? "Editar Producto" : "Nuevo Producto"}</h3>

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

            <textarea
              className="input"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />

            <input
              type="number"
              className="input"
              placeholder="Precio"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
            />

            <input
              className="input"
              placeholder="Marca"
              value={form.marca}
              onChange={(e) => setForm({ ...form, marca: e.target.value })}
            />

            {/* SELECT CATEGORÍA */}
            <select
              className="input"
              value={form.categoriaId}
              onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}
            >
              <option value="">Selecciona categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>

            <label className="check">
              <input
                type="checkbox"
                checked={form.activo}
                onChange={(e) => setForm({ ...form, activo: e.target.checked })}
              />
              Activo
            </label>

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

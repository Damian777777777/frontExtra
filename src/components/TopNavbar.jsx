import "./TopNavbar.css";

export default function TopNavbar() {
  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <h2 className="logo">Extra</h2>
      </div>

      <div className="nav-right">
        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/categorias">Categorías</a>
        <a href="/inventario">Inventario</a>
      </div>
    </nav>
  );
}

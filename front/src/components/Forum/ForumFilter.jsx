import React from "react"; 

const ForumFilter = ({ category, setCategory, order, setOrder, onFilter }) => { // Componente de filtro
  const handleFilterClick = () => { 
    onFilter();
  };

  return (
    <div className="filter-section"> 
      <h3>Categoria</h3>
      <select value={category} onChange={(e) => setCategory(e.target.value)}> {/* Seleção de categoria */}
        <option value="">Todas as categorias</option>
        <option value="alagamento">Alagamento</option>
        <option value="bueiro">Bueiro Entupido</option>
        <option value="quedaarvore">Queda de arvore</option>
        <option value="deslizamento">Deslizamento</option>
        {/* Outras opções */}
      </select>
      <h3>Ordenar por:</h3>
      <select value={order} onChange={(e) => setOrder(e.target.value)}> {/* Seleção de ordem */}
        <option value="recent">Mais recentes</option>
        <option value="oldest">Mais antigos</option>
      </select>
      <button className="filter-btn" onClick={handleFilterClick}>FILTRAR</button> 
    </div>
  );
};

export default ForumFilter;
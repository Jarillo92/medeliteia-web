// Etiqueta pequeña en mayúsculas y monoespaciada sobre cada título de sección, en el color del sector
function SectionLabel({ children, className = '' }) {
  return (
    <p className={`font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-sector ${className}`}>
      {children}
    </p>
  );
}

export default SectionLabel

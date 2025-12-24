import React, { useRef, useEffect } from "react";

// 1. Definición del Componente Funcional
const CanvasDibujo = () => {
  // 2. Crear una referencia (ref) para acceder al elemento <canvas> del DOM
  const canvasRef = useRef(null);

  // 3. Usar useEffect para ejecutar el código de dibujo después del renderizado inicial
  useEffect(() => {
    // A. Acceder al elemento canvas a través de la referencia
    const canvas = canvasRef.current;

    // B. Obtener el contexto de renderizado 2D
    // El '|| return' asegura que el código se detenga si no se obtiene el contexto.
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // C. Ajustar el tamaño del canvas (si no se define por props)
    // Usamos el tamaño definido directamente en el elemento <canvas>
    const width = canvas.width;
    const height = canvas.height;

    // Opcional: limpiar el lienzo antes de dibujar (útil para animaciones)
    ctx.clearRect(0, 0, width, height);

    // D. Código de Dibujo (Igual que en JavaScript vanilla)
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 20, 100, 75);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.strokeRect(150, 40, 80, 50);
  }, []); // El array de dependencias vacío [] asegura que solo se ejecute una vez al montar

  // 4. Renderizar el elemento <canvas> y pasarle la referencia (ref)
  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={150}
      style={{ border: "1px solid black" }}
    >
      Tu navegador no soporta el elemento canvas.
    </canvas>
  );
};

export default CanvasDibujo;

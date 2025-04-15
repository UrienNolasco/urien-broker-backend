const io = require('socket.io-client');

// Lista de ações para testar
const tickers = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4'];

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('🟢 Conectado ao WebSocket');

  tickers.forEach((ticker) => {
    console.log(`📤 Enviando: ${ticker}`);
    socket.emit('watch_price', ticker);
  });
});

socket.on('price_update', (data) => {
  console.log(`📈 Preço de ${data.ticker}: R$ ${data.price}`);
});

socket.on('disconnect', () => {
  console.log('🔴 Desconectado.');
});

socket.on('connect_error', (err) => {
  console.error('❌ Erro na conexão:', err.message);
});

setTimeout(() => {
  socket.close();
}, 5000); // Aguarda 5 segundos para ver as respostas

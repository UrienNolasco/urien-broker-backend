const io = require('socket.io-client');

// Lista de ações para testar
const tickers = ['PETR4', 'BBAS3', 'ITUB4', 'BBDC4'];

const socket = io('http://localhost:3000/price', {
  query: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NzhmNmYwZC03ZGI1LTRkOGEtYjU2Ni1jY2JmZWIyN2VjYzkiLCJlbWFpbCI6IkFsZXhhbmRyZS5mYXJpYUBnbWFpbC5jb20iLCJpYXQiOjE3NDQ3NjE1NzMsImV4cCI6MTc0NDc2MTg3M30.43Zi8mwlzSx08yle-4nG9mwZmbVaVtAuejykmabv_OU' // Enviado como "token"
  }
});

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

import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

// Basic health check route
app.get('/health', async (request, reply) => {
  return { status: 'ok', message: 'Server is running' };
});

// Get user wallet
app.get('/api/wallet/:address', async (request, reply) => {
  const { address } = request.params as { address: string };
  return {
    address,
    balance: '1000.00',
    currency: 'XLM',
  };
});

// Create transaction
app.post('/api/transaction', async (request, reply) => {
  const body = request.body as {
    from: string;
    to: string;
    amount: string;
  };
  
  return {
    transactionId: 'TXN_123456',
    status: 'pending',
    from: body.from,
    to: body.to,
    amount: body.amount,
  };
});

// Start server
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

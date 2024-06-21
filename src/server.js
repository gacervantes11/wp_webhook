import express from 'express';

const app = express();
app.use(express.json());

/* Verify webhook */
app.get('/webhook', async function (req, res) {
  console.log('Received webhook request:', req.query);
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == 'token'
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

/* handle whatsapp message */
app.post("/webhook", async (req, res) => {
  try {
    // req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.type === 'document' 
    if (
      req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.type === 'text'
    ) {
      console.log("Message:", req.body);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling webhook request:', error);
    res.status(500).send(error.message);
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
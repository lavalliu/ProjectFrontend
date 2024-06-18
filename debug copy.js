
fastify.get('/', (req, reply) => {
    reply.view('index.ejs');
});
    
fastify.get("/", (req, reply) => {
    reply.view("index.ejs");
});
  
fastify.get("/index", (req, reply) => {
    reply.view("index.ejs");
});

fastify.get("/about", (req, reply) => {
    reply.view("about.ejs");
});

fastify.get("/additems", (req, reply) => {
    reply.view("additems.ejs");
});

fastify.get("/aperitifs", (req, reply) => {
    reply.view("aperitifs.ejs");
});

fastify.get("/cocktails", (req, reply) => {
    reply.view("cocktails.ejs");
});

fastify.get("/contact", (req, reply) => {
    reply.view("contact.ejs");
});

fastify.get("/desserts", (req, reply) => {
    reply.view("desserts.ejs");
});

fastify.get("/displayresa", (req, reply) => {
    reply.view("displayresa.ejs");
});

fastify.get("/hot", (req, reply) => {
    reply.view("hot.ejs");
});

fastify.get("/listresas", (req, reply) => {
    reply.view("listresas.ejs");
});

fastify.get("/login", (req, reply) => {
    reply.view("login.ejs");
});

fastify.get("/maincourse", (req, reply) => {
    reply.view("maincourse.ejs");
});

fastify.get("/modifyitems", (req, reply) => {
    reply.view("modifyitems.ejs");
});

fastify.get("/order", (req, reply) => {
    reply.view("order.ejs");
});

fastify.get("/page", (req, reply) => {
    reply.view("page.ejs");
});

fastify.get("/payment", (req, reply) => {
    reply.view("payment.ejs");
});

fastify.get("/register", (req, reply) => {
    reply.view("register.ejs");
});

fastify.get("/reservation", (req, reply) => {
    reply.view("reservation.ejs");
});

fastify.get("/soft", (req, reply) => {
    reply.view("soft.ejs");
});

fastify.get("/starters", (req, reply) => {
    reply.view("starters.ejs");
});

fastify.get("/update", (req, reply) => {
    reply.view("update.ejs");
});

fastify.get("/user", (req, reply) => {
    reply.view("user.ejs");
});

fastify.get("/wine", (req, reply) => {
    reply.view("wine.ejs");
});
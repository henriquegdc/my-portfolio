<hr>

<div align="center">
  <img src="Código/img/portfolio%20capa.jpg" alt="Capa do Portfólio" width="100%">
</div>

<hr>

<h1>Repo Portfólio  🖥️</h1>

<p>
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript">
  <img src="https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34" alt="Firebase">
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/github/stars/henriquegdc/my-portfolio?style=for-the-badge&logo=github" alt="GitHub stars">
  <img src="https://img.shields.io/github/last-commit/henriquegdc/my-portfolio?style=for-the-badge&logo=clockify" alt="GitHub last commit">
</p>

<hr>

<p>Este é o repositório do meu <strong>portfólio pessoal</strong>, desenvolvido do zero para exibir a minha evolução contínua na Engenharia de Software. Mais do que uma montra de projetos, este portfólio é em si um projeto <em>Full-Stack</em>, com uma interface dinâmica no cliente e processos seguros a correr no servidor.</p>

<p>🖥️ O design foi inspirado num <strong>Terminal de Segurança (Command Center)</strong>, proporcionando uma experiência imersiva e moderna. Entre as principais funcionalidades destacam-se:</p>

<ul>
  <li>📊 <strong>Monitor de Segurança (Dashboard):</strong> Integração com APIs do WakaTime e GitHub para exibição de linguagens mais utilizadas, horas de código e o <em>streak</em> de contribuições em tempo real.</li>
  <li>💬 <strong>Sistema de Feedbacks:</strong> Base de dados NoSQL (Firebase Firestore) integrada para receber e exibir comentários de visitantes em tempo real.</li>
  <li>🔒 <strong>Contacto Seguro (Serverless):</strong> Formulário de contacto blindado através de uma Serverless Function no Vercel (<code>/api/contact</code>), que processa e envia os e-mails de forma oculta via EmailJS, protegendo totalmente as chaves de API.</li>
  <li>🌐 <strong>Suporte Multilíngue:</strong> Sistema nativo em JavaScript para alternar entre Português (PT-BR) e Inglês (EN) de forma fluida e sem recarregar a página.</li>
  <li>🎬 <strong>Animações Avançadas:</strong> Utilização das bibliotecas GSAP (ScrollTrigger) e Anime.js para efeitos visuais, <em>Matrix rain</em> e transições suaves.</li>
</ul>

<hr>

<h2>🚀 Demonstração ao vivo</h2>

<p>A versão online deste projeto está alojada na Vercel e pode ser acedida através do link abaixo:</p>
<ul>
  <li>➡️ <strong><a href="https://henriquegdc.dev">https://henriquegdc.dev</a></strong></li>
</ul>

<hr>

<h2>🛠️ Tecnologias utilizadas</h2>

<ul>
  <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript (Vanilla JS).</li>
  <li><strong>Backend / API:</strong> Vercel Serverless Functions (Node.js).</li>
  <li><strong>Base de Dados:</strong> Firebase (Firestore) para persistência dos feedbacks.</li>
  <li><strong>Envio de E-mails:</strong> EmailJS (comunicando diretamente com o backend).</li>
  <li><strong>Animações:</strong> GSAP (GreenSock) e Anime.js.</li>
</ul>

<hr>

<h2>🔐 Guia de Configuração Segura do EmailJS (Serverless)</h2>

<p>Para garantir a máxima segurança, este projeto não utiliza a biblioteca do EmailJS no frontend. O formulário envia um pedido <code>POST</code> para uma rota <code>/api/contact</code> criada através das Serverless Functions da Vercel.</p>

<h3>1. Criar a sua conta e templates no EmailJS</h3>
<ol>
  <li>Crie uma conta no <a href="https://www.emailjs.com/">EmailJS</a>.</li>
  <li>Adicione um <strong>Email Service</strong> (ex: Gmail).</li>
  <li>Crie um <strong>Template</strong> de e-mail e certifique-se de usar as mesmas variáveis definidas no backend (<code>{{from_name}}</code>, <code>{{from_email}}</code>, <code>{{subject}}</code>, <code>{{message}}</code>).</li>
</ol>

<h3>2. Configurar Segurança Máxima</h3>
<p>No painel do EmailJS, vá a <strong>Account</strong> -&gt; <strong>Security</strong>:</p>
<ul>
  <li>Ative a opção <strong>"Allow API requests from non-browser environments"</strong> (Isto é obrigatório, pois o pedido virá do servidor da Vercel).</li>
  <li>Copie a sua <strong>Private Key</strong> na aba "General".</li>
</ul>

<h3>3. Variáveis de Ambiente na Vercel</h3>
<p>Para que o ficheiro <code>api/contact.js</code> funcione, adicione as seguintes variáveis na secção <strong>Settings &gt; Environment Variables</strong> do seu projeto na Vercel:</p>
<ul>
  <li><code>EMAILJS_SERVICE_ID</code>: O ID do serviço de e-mail configurado.</li>
  <li><code>EMAILJS_TEMPLATE_ID</code>: O ID do template criado.</li>
  <li><code>EMAILJS_PUBLIC_KEY</code>: A sua chave pública.</li>
  <li><code>EMAILJS_PRIVATE_KEY</code>: A sua chave privada (Necessária devido ao <em>strict mode</em> para pedidos de servidor).</li>
</ul>
<p>O seu backend está configurado com regras de validação (Fail Fast) para impedir spam com campos vazios ou mensagens com mais de 2000 caracteres!</p>

<hr>

<h2>📝 Guia de Configuração do Firebase (Feedbacks)</h2>

<p>O sistema de "Feedbacks" utiliza o <strong>Firestore</strong> do Firebase para gravar e ler mensagens em tempo real.</p>

<h3>1. Criar o Projeto Firebase</h3>
<ol>
  <li>Vá à <a href="https://console.firebase.google.com/">Consola do Firebase</a> e crie um projeto.</li>
  <li>Adicione uma aplicação <strong>Web</strong> para obter as suas chaves de configuração.</li>
  <li>No menu lateral, aceda a <strong>Firestore Database</strong> e crie uma base de dados.</li>
  <li>Inicie uma coleção chamada <code>feedbacks</code>.</li>
</ol>

<h3>2. Configuração no Projeto</h3>
<p>Substitua as credenciais no ficheiro <code>firebase.js</code> na raiz da pasta <code>Código</code>:</p>

<pre><code class="language-javascript">const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.firebasestorage.app",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
</code></pre>

<p><em>(Nota: As chaves do Firebase para o frontend são públicas por natureza. A segurança é feita diretamente nas regras da base de dados).</em></p>

<h3>3. Regras de Segurança (Firestore Rules)</h3>
<p>Para evitar abusos ou apagamento de dados por terceiros, aplique as seguintes regras no separador <strong>Rules</strong> do seu Firestore Database:</p>

<pre><code class="language-javascript">rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /feedbacks/{document=**} {
      // Qualquer um pode ler os feedbacks
      allow read: if true;
      // Qualquer um pode criar, mas as mensagens não podem ser vazias ou alteradas/apagadas depois
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'date']) 
                    &amp;&amp; request.resource.data.name is string
                    &amp;&amp; request.resource.data.message is string;
      allow update, delete: if false;
    }
  }
}
</code></pre>

<hr>

<h2>📊 WakaTime &amp; GitHub Stats</h2>

<p>Este projeto utiliza ferramentas open-source para gerar as imagens do seu "Monitor de Segurança":</p>
<ul>
  <li><strong>WakaTime:</strong> Registe-se no <a href="https://wakatime.com/">WakaTime</a>, instale o plugin no seu VS Code/IDE, e certifique-se de marcar o seu código, linguagens e <em>stats</em> como públicos nas definições do WakaTime.</li>
  <li><strong>Métricas do GitHub:</strong> As imagens são geradas dinamicamente usando projetos como o <a href="https://github.com/anmol098/waka-readme-stats">GitHub Readme Stats</a> e o <a href="https://github.com/vn7n24fzkq/github-profile-summary-cards">GitHub Profile Summary Cards</a>. Basta alterar o parâmetro <code>?username=henriquegdc</code> nos ficheiros HTML para o seu próprio utilizador.</li>
</ul>

<hr>

<h2>⚙️ Como executar localmente</h2>

<p>Como o projeto utiliza <strong>Módulos ES6</strong> (<code>&lt;script type="module" src="Portfolio.js"&gt;&lt;/script&gt;</code>), ele precisa de um servidor HTTP para correr localmente e contornar as políticas de CORS do navegador.</p>

<ol>
  <li><strong>Clone o repositório:</strong>
    <pre><code class="language-bash">git clone https://github.com/henriquegdc/my-portfolio.git</code></pre>
  </li>
  <li><strong>Abra o projeto no VS Code.</strong></li>
  <li><strong>Utilize o Live Server:</strong>
    Instale a extensão <strong>Live Server</strong> no VS Code. Clique com o botão direito no ficheiro <code>Código/index.html</code> e selecione <strong>"Open with Live Server"</strong>.
  </li>
</ol>

<p><em>Nota:</em> O envio de e-mails do formulário de contacto só funcionará no ambiente de produção (após <em>deploy</em> na Vercel) ou se utilizar o <code>Vercel CLI</code> (<code>vercel dev</code>) localmente, pois necessita da Serverless Function (<code>/api/contact.js</code>) para processar o pedido.</p>

<hr>

<h2>🔗 Links úteis</h2>

<ul>
  <li><strong>Vercel Serverless Functions:</strong> <a href="https://vercel.com/docs/functions">Documentação</a></li>
  <li><strong>Firebase Firestore:</strong> <a href="https://firebase.google.com/docs/firestore">Documentação</a></li>
  <li><strong>EmailJS API:</strong> <a href="https://www.emailjs.com/docs/rest-api/send/">Documentação Oficial</a></li>
  <li><strong>Anime.js:</strong> <a href="https://animejs.com/documentation/">Documentação</a></li>
  <li><strong>GSAP ScrollTrigger:</strong> <a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/">Documentação</a></li>
</ul>

<hr>

<h2>📄 Licença</h2>

<p>Este projeto é distribuído sob a Licença MIT.</p>

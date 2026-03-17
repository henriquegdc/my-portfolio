export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (mensagem.length > 2000) {
        return res.status(400).json({ error: 'A mensagem excede o limite de 2000 caracteres.' });
    }

    const data = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem
        }
    };

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
        } else {
            const errorText = await response.text();
            return res.status(500).json({ error: errorText });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
}
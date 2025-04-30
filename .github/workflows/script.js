document.addEventListener("DOMContentLoaded", function() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Meses são indexados de 0 a 11
    const ano = dataAtual.getFullYear();
    document.getElementById('dataAtual').value = `${ano}-${mes}-${dia}`;
});

function calculate() {
    const dataAtualInput = document.getElementById('dataAtual').value;
    const valorAtualInput = document.getElementById('valorAtual').value.replace(',', '.');

    if (!dataAtualInput || !valorAtualInput) {
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        return;
    }

    const dataAtual = new Date(dataAtualInput);
    const dataFinal = new Date('2025-12-31');
    const diasFaltantes = Math.ceil((dataFinal - dataAtual) / (1000 * 60 * 60 * 24));

    const valorAtual = parseFloat(valorAtualInput);

    if (isNaN(valorAtual)) {
        alert("Por favor, insira um valor numérico válido para 'Valor Atual'.");
        return;
    }

    const indiceIGPM = 0.0859; // 8.59%
    const valorIGPM = valorAtual + (valorAtual * indiceIGPM);

    const valorProRata = (valorIGPM / 365) * diasFaltantes;

    document.getElementById('diasFaltantes').value = diasFaltantes;
    document.getElementById('valorIGPM').value = valorIGPM.toFixed(2).replace('.', ',');
    document.getElementById('valorProRata').value = valorProRata.toFixed(2).replace('.', ',');

    document.getElementById('valorRenovacao').innerText = `R$ ${valorProRata.toFixed(2).replace('.', ',')}`;
    document.getElementById('resultado').style.display = 'block';
}

function copiarTexto() {
    const valorRenovacao = document.getElementById('valorRenovacao').innerText;
    const textoParaCopiar = `O valor da renovação até dezembro 2025 é ${valorRenovacao} (esse valor pode ser parcelado em até 3x sem juros no cartão de crédito). Não faturamos por boleto.\n` +
                            `Acesso ao atendimento de suporte técnico através do “Ajuda On-line” para solução de dúvidas – Disponível de segunda à sexta das 09:00 às 18:00.\n` +
                            `Correções de erros de sistema\n` +
                            `Licença de uso do sistema DESKTOP`;
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert("Texto copiado para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
    });
}

const survival = [
{title:'O primeiro dia sem provisões',act:'I · O estrangeiro',set:'creek',lines:[
  'O sol subiu e ele ainda não tinha encontrado uma casa. No bolso havia um pedaço de pão encharcado. Comeu metade. Guardou a outra por hábito, embora não soubesse quando voltaria a ter comida.',
  'Viu bagas junto a um córrego e pensou em colher as mais claras. Um bando de pássaros passou sem tocá-las. Deixou-as no lugar. A fome tornava atraente qualquer certeza que ele pudesse inventar.',
  'Lavou a lama da mão e encontrou um corte na palma. Antes de beber, seguiu o córrego até longe da carcaça de um animal. Ferveu a água numa pequena panela abandonada junto a uma antiga fogueira.',
  'Quando escureceu, dormiu de costas para a pedra, a pistola sobre o joelho. A pólvora estava úmida. Mesmo assim, levou muito tempo para aceitar que segurava apenas um pedaço pesado de metal.'
]},
{title:'O bolso vazio',act:'I · O estrangeiro',set:'shelter',lines:[
  'Na manhã seguinte, abriu a caixa de rapé. A chuva deixara uma pasta escura no fundo. Tornou a fechá-la. Pouco depois, procurou a caixa de novo sem perceber o que a mão fazia.',
  'A cabeça latejava e o estômago doía. Podia ser o tabaco, a fome ou a noite sem dormir. O que o irritava era não poder dar uma ordem que mudasse qualquer uma daquelas coisas.',
  'O Pikachu reapareceu perto de uma cerca, comendo uma baga azul. Napoleão esperou. Quando o animal se afastou, colheu uma do mesmo ramo. Comeu devagar, atento ao amargor e ao próprio medo.',
  'Ao longe, viu fumaça. Pela primeira vez desde a tempestade, desceu do caminho e foi em direção a alguém, ainda sem saber como pedir ajuda.'
]}];
story.splice(2,0,...survival);
const elmScene=story.find(s=>s.set==='lab');
elmScene.lines.unshift(
  'Nara, a filha da anfitriã, levou o estrangeiro a Elm depois que ele desenhou o Pikachu ao lado de uma árvore cortada por um raio. Elm entendeu o desenho. A explicação em francês continuou incompreensível.',
  'Durante uma semana usaram um caderno de figuras. Nara escrevia a palavra de Johto abaixo do objeto. Napoleão anotava como ela soava. Aprendeu a perguntar antes de conseguir entender a resposta.'
);
elmScene.lines.splice(4,0,'Quando Elm ligou o computador do laboratório, Napoleão procurou o homem que deveria estar movendo as letras. Chamou de telégrafo. Elm levou três desenhos e uma tarde para explicar por que a comparação só ia até certo ponto.');
const moon=story.find(s=>s.set==='letter');
moon.lines.splice(2,0,'Durante semanas, ainda levou a mão ao bolso depois de comer. Trocou o gesto por preparar chá com Nara. Nas manhãs ruins, continuava querendo o rapé. Levava água antes de decidir se estava de fato zangado com alguém.');
const works=story.find(s=>s.set==='works');
works.lines.splice(1,0,'Brasa ainda viajava com ele. Em cada aldeia, Napoleão perguntava ao primeiro treinador que encontrava onde havia água, abrigo e um Centro Pokémon. Guardava essas respostas antes de perguntar quem governava o lugar.');
for(const s of story){
 if(['lab','starter'].includes(s.set))s.act='II · A ciência de Johto';
 if(s.set==='letter')s.act='III · A estrada para Violet';
 if(['market','fire','bridge','strategy'].includes(s.set))s.act='IV · Aprender a mandar';
 if(s.set==='ruins')s.act='V · Ecruteak';
 if(['docks','raid','council'].includes(s.set))s.act='VI · A Equipe Rocket';
 if(['stair','phoenix'].includes(s.set))s.act='VII · As asas sobre Johto';
 if(['works','choice','vote'].includes(s.set))s.act='VIII · O reformador';
}

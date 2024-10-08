class RecintosZoo {
    constructor() {
        // Recinto
        this.recintos = [
            { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "macaco", quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "gazela", quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "leao", quantidade: 1, tamanho: 3 }] }
          ];
          
          // Animais
          this.animais = {
            LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
          };
    } 
    
    let 
    analisaRecintos(animal, quantidade) {
        const verAnimal = this.animais[animal.toUpperCase()]

        // Verificar os animais permitidos
        if(!verAnimal) {
            return {erro: "Animal inválido"}
        }

        // Verificar a quantidade
        if(quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        // Calculo da quantidadede animais por bioma
        const recintosViaveis = [];

        this.recintos.forEach((rec) => {
            let espaco = 0;
            let temCarnivoro = false;
            let compativel = false;

            const biomasRecinto = rec.bioma.split(" e ").map((b) => b.trim());
            const biomaCompativel = verAnimal.bioma.some((b) =>
              biomasRecinto.includes(b)
            );

            compativel = biomaCompativel;
      
            rec.animais.forEach((ani) => {
                let verEspecie = this.animais[ani.especie.toUpperCase()]
                espaco = espaco + ani.quantidade * verEspecie.tamanho;
                if(verEspecie.carnivoro) {
                    temCarnivoro = true;
                }
            });

            if (rec.animais.length !== 0) {
            let buscarAnimalRecinto = rec.animais[0].especie.toUpperCase();
            let encontrarAnimalCarnivoro = this.animais[buscarAnimalRecinto].carnivoro
            
            if (verAnimal.carnivoro !== encontrarAnimalCarnivoro) {
                compativel = false;
              }

            let espacoExtra = buscarAnimalRecinto === animal ? 0 : 1;
            let espacoNecessario = quantidade * verAnimal.tamanho + espacoExtra;

            if(compativel && espaco + espacoNecessario <= rec.tamanho) {
                recintosViaveis.push({
                    numero: rec.numero,
                    espacoLivre: rec.tamanho - (espaco + espacoNecessario),
                    espacoTotal: rec.tamanho
                });
            }
            } else {
            let espacoExtra = rec.animais.especie = animal ? 0 : 1;

            let espacoNecessario = quantidade * verAnimal.tamanho + espacoExtra;
    
            if(compativel && espaco + espacoNecessario <= rec.tamanho) {
                recintosViaveis.push({
                    numero: rec.numero,
                    espacoLivre: rec.tamanho - (espaco + espacoNecessario),
                    espacoTotal: rec.tamanho
                });
                }                

            }
        });
        
        if(recintosViaveis.length > 0) {
            return {
                recintosViaveis: recintosViaveis.map(
                  (recinto) =>
                    `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
                )
              };
        } else {
            return {erro: "Não há recinto viável"}
        }

    }

}

// const resultado = new RecintosZoo().analisaRecintos('MACACO', 2)

export { RecintosZoo as RecintosZoo };

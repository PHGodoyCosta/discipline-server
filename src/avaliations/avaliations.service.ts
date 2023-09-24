import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Avaliation } from './entities/avaliation.entity';

import { CreateAvaliationDto } from './dto/create-avaliation.dto';
import { UpdateAvaliationDto } from './dto/update-avaliation.dto';
import { DcpQuestion, DcpQGroup, DcpQuestionType, DcpSectionItemType, DisciplineFileData } from 'src/discipline-file.interface';

@Injectable()
export class AvaliationsService {
  constructor(
    @InjectRepository(Avaliation)
    private repository: Repository<Avaliation>,
  ) { }

  findAll(params: any): Promise<Avaliation[]> {
    let query = this.repository
      .createQueryBuilder('avaliation')
      .leftJoinAndSelect("avaliation.institution", "institution")
      .where('avaliation.is_active = :is_active', { is_active: 1 })

    if (params.title) query.andWhere('avaliation.title like :title', { title: `%${params.title}%` })
    if (params.year) query.andWhere('avaliation.year = :year', { year: params.year })

    if (params.start) query.offset(params.start)
    if (params.limit) query.limit(params.limit)

    return query
      .orderBy(params.sort ?? 'title', "ASC")
      .getMany()
  }

  findOne(hash: string): Promise<Avaliation | null> {
    return this.repository.findOneBy({ hash });
  }

  create(createAvaliationDto: CreateAvaliationDto): Promise<Avaliation> {
    return this.repository.save(createAvaliationDto)
  }

  update(hash: string, updateAvaliationDto: UpdateAvaliationDto): Promise<any> {
    return this.repository.update({ hash }, updateAvaliationDto);
  }

  async remove(hash: string): Promise<void> {
    await this.repository.softDelete({ hash });
  }

  getDisciplineFile(hash: string): Promise<DisciplineFileData> {
    const fs = require('fs')
    const empty = `${__dirname}/../../public/examples/avaliation/empty.discipline`
    const example = `${__dirname}/../../public/examples/avaliation/arquivo.discipline`
    const path = `${__dirname}/../../uploads/avaliations/${hash}/arquivo.discipline`

    return new Promise((resolve, reject) => {
      try {
        let fileData

        switch (hash) {
          case 'empty': fileData = JSON.parse(fs.readFileSync(empty, 'utf-8'))
            break;
          case 'example': fileData = JSON.parse(fs.readFileSync(example, 'utf-8'))
            break;
          case 'mock': fileData = this.getDisciplineFileMock()
            break;
          default: fileData = JSON.parse(fs.readFileSync(path, 'utf-8'))
            break;
        }

        resolve(fileData);
      } catch (error) {
        reject(error)
      }
    });
  }

  getDisciplineFileMock() {
    const sectionItem1: DcpQuestion = {
      hash: "<UUID>",
      type: DcpSectionItemType.QUESTION,
      question_type: DcpQuestionType.RADIO,
      header: [
        {
          title: `<p>Um atleta ao ser submetido a um determinado treino específico apresenta, ao longo do tempo, ganho de massa muscular.</p>
          <p>A função P(t) = P0 + 0,19 t, expressa o peso do atleta em função do tempo ao realizar esse treinamento, sendo P0 o seu peso inicial e t o tempo em dias.</p>
          <p>Considere um atleta que antes do treinamento apresentava 55 kg e que necessita chegar ao peso de 60 kg, em um mês. Fazendo unicamente esse treinamento, será possível alcançar o resultado esperado?</p>`,
          image_source: "http://localhost:3000/public/examples/avaliation/images/question-1-image-1.png",
          caption: "Função Afim"
        }
      ],
      options: [
        {
          hash: "<UUID>",
          option_text: 20,
        },
        {
          hash: "<UUID>",
          option_text: 40,
        },
        {
          hash: "<UUID>",
          option_text: 50,
        },
        {
          hash: "<UUID>",
          option_text: 65,
        },
        {
          hash: "<UUID>",
          option_text: 70,
        },
      ],
      correct_answer: "<option.hash == UUID>"
    }

    const sectionItem2: DcpQuestion = {
      hash: "<UUID>",
      type: DcpSectionItemType.QUESTION,
      question_type: DcpQuestionType.RADIO,
      header: [
        {
          image_source: "http://localhost:3000/public/examples/avaliation/images/question-2-image-1.png",
        }
      ],
      options: [
        {
          hash: "<UUID>",
          option_text: "necessidade de acessar informações confidenciais.",
        },
        {
          hash: "<UUID>",
          option_text: "dificuldade de conciliar diferentes anseios.",
        },
        {
          hash: "<UUID>",
          option_text: "desejo de dominar novas tecnologias.",
        },
        {
          hash: "<UUID>",
          option_text: "desafio de permanecer imparcial. E vontade de ler notícias positivas.",
        },
        {
          hash: "<UUID>",
          option_text: "outra alternativa",
        },
      ],
      correct_answer: "<option.hash == UUID>"
    }

    const sectionItem3: DcpQuestion = {
      _comment: "Enem 2022 Caderno 1 - AZUL - 1ª Aplicação, Página 6 - Questão 7",
      hash: "<UUID>",
      type: DcpSectionItemType.QUESTION,
      question_type: DcpQuestionType.RADIO,
      header: [
        {
          title: "TEXTO I",
          image_source: "http://localhost:3000/public/examples/avaliation/images/question-3-image-1.png",
          caption: "Disponível em: https://amigodobicho.wordpress.com. Acesso em: 10 dez. 2017."
        },
        {
          title: "TEXTO II",
          snippet: "Nas ruas, na cidade e no parque Ninguém nunca prendeu o Delegado. O vaivém de rua em rua e sua longa vida são relembrados e recontados. Exemplo de sobrevivência, liderança, inteligência canina, desde pequenininho seu focinho negro e seus olhos delineados desenharam um mapa mental olfativo-visual de Lavras. Corria de quem precisava correr e se aproximava de quem não lhe faria mal, distinguia este daquele. Assim, tornou-se um cão comunitário. Nunca se soube por que escolheu a rua, talvez lhe tenham feito mal dentro de quatro paredes. Idoso, teve câncer e desapareceu. O querido foi procurado pela cidade inteira por duas protetoras, mas nunca encontrado.",
          caption: "COSTA, A. R. N. Viver o amor aos cães: Parque Francisco de Assis.<br/> Carmo do Cachoeira: Irdin, 2014 (adaptado)"
        },
        {
          statement: "Os dois textos abordam a temática de animais de rua, porém, em relação ao Texto I, o Texto II"
        }
      ],
      options: [
        {
          hash: "<UUID>",
          option_text: "problematiza a necessidade de adoção de animais sem lar.",
        },
        {
          hash: "<UUID>",
          option_text: "valida a troca afetiva entre os pets adotados e seus donos.",
        },
        {
          hash: "<UUID>",
          option_text: "reforça a importância da campanha de adoção de animais.",
        },
        {
          hash: "<UUID>",
          option_text: "exalta a natureza amigável de cães e de gatos.",
        },
        {
          hash: "<UUID>",
          option_text: "promove a campanha de adoção de animais.",
        }
      ],
      correct_answer: "<option.hash == UUID>"
    }

    const sectionItem4: DcpQGroup = {
      hash: "<UUID>",
      type: DcpSectionItemType.GROUP,
      header: [
        {
          statement: "Preencha as lacunas com mais, mas ou más."
        }
      ],
      questions: [
        {
          hash: "<UUID>",
          type: DcpSectionItemType.QUESTION,
          question_type: DcpQuestionType.RADIO,
          header: [
            {
              statement: "Porque não desse jeito?"
            }
          ],
          options: [
            {
              hash: "<UUID>",
              option_text: "necessidade de acessar informações confidenciais.",
            },
            {
              hash: "<UUID>",
              option_text: "dificuldade de conciliar diferentes anseios.",
            },
            {
              hash: "<UUID>",
              option_text: "desejo de dominar novas tecnologias.",
            },
          ],
          correct_answer: "<option.hash == UUID>"
        },
        {
          hash: "<UUID>",
          type: DcpSectionItemType.QUESTION,
          question_type: DcpQuestionType.RADIO,
          header: [
            {
              statement: "E desse outro jeito, o que acha?"
            }
          ],
          options: [
            {
              hash: "<UUID>",
              option_text: "necessidade de acessar informações confidenciais.",
            },
            {
              hash: "<UUID>",
              option_text: "dificuldade de conciliar diferentes anseios.",
            },
            {
              hash: "<UUID>",
              option_text: "desejo de dominar novas tecnologias.",
            },
          ],
          correct_answer: "<option.hash == UUID>"
        }
      ]
    }

    let data: DisciplineFileData = {
      hash: "d2d343b8-1a12-4243-8f8e-65ddece48918",
      title: "Enem 2020",
      description: "Arquivo Discipline de Teste 2 - Prova do 1º Dia - Caderno 1 – Azul – Aplicação Regular - https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos",
      created_at: "2023-09-14 10:16:00",
      updated_at: "2023-09-18 12:54:00",
      sections: [
        {
          items: [
            sectionItem1, sectionItem2, sectionItem3, sectionItem4
          ]
        }
      ]
    }
    return data
  }
}

import os
import json
import shutil
from uuid import uuid4 as v4
from collections import defaultdict

DISCIPLINE_FILE = "./uploads/avaliations/d2d343b8-1a12-4243-8f8e-65ddece48918/arquivo.discipline"
DISCIPLINE_CONTENT = json.loads(open(DISCIPLINE_FILE, "r+").read())
IMAGES_PATH = "/home/phgodoycosta/Downloads/Provas_Enem/imagens/Enem_2020_imagens"
IMAGENS_LIST = os.listdir(IMAGES_PATH)

if not os.path.isdir("images_temp"):
    os.mkdir("images_temp")

imagens_por_questao = defaultdict(list)
for img_name in IMAGENS_LIST:
    partes = img_name.split("-")
    if len(partes) >= 2:
        try:
            numero_questao = int(partes[0])
            imagens_por_questao[numero_questao].append(img_name)
        except ValueError:
            continue

for lista in imagens_por_questao.values():
    lista.sort(key=lambda nome: int(nome.split("-")[1].split(".")[0]))

for i, question in enumerate(DISCIPLINE_CONTENT["sections"][0]["items"]):
    imagens_para_questao = imagens_por_questao.get(i + 1, [])  # questão começa em 1
    if not imagens_para_questao:
        continue

    header_items = question.get("header", [])
    for headerItem in header_items:
        if headerItem.get("image"):
            for j, img in enumerate(headerItem["image"]):
                if j < len(imagens_para_questao):
                    nome_original = imagens_para_questao[j]
                    extensao = nome_original.split(".")[-1]
                    novo_nome = f"{v4()}.{extensao}"

                    shutil.copy(
                        os.path.join(IMAGES_PATH, nome_original),
                        os.path.join("images_temp", novo_nome)
                    )

                    img["image_source"] = f"<host>/uploads/images/{novo_nome}"

with open("return.json", "w+", encoding="utf-8") as f:
    f.write(json.dumps(DISCIPLINE_CONTENT, indent=4, ensure_ascii=False))

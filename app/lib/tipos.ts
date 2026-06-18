export type Categoria = "bebe" | "presentes";

export interface Produto {
  sku: string;
  titulo: string;
  descricao: string;
  preco: number;
  preco_original: number | null;
  categoria: Categoria;
  subcategoria: string;
  imagens: string[];
  ativo: boolean;
  estoque: number;
  personalizacao: string[];
  tags: string[];
  peso_g: number;
  criado_em: string;
  atualizado_em: string;
}

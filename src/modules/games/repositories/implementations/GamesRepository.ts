import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder

    /**
     * Esse método deve receber parte do título de um jogo ou o título inteiro e retornar um ou mais jogos que derem match com a consulta. 
     * 
     * Se o método for chamado com o argumento `"or S"` e existir algum jogo com essa sequência de letras no título, o retorno deve ser feito.
     * 
     * A consulta também deve ser feita de forma case insensitive, ignorando caixa alta onde no banco não existe.
     * Para exemplo, considerando a busca exemplificada acima, o retorno deve ser o mesmo caso o parâmetro passado seja uma string "nEEd".
     */
    return this.repository
    .createQueryBuilder('games')
    .where('games.title ILIKE :title', { title: `%${param}%` })
    .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query

    /**
     * Esse método deve retornar uma contagem do total de games existentes no banco. Deve ser usada raw query para essa consulta.
     */
    return this.repository.query('SELECT COUNT(*) FROM games');  
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    
    /**
     * Esse método deve receber o Id de um game e retornar uma lista de todos os usuários que possuem o game do Id informado. 
     */
    return this.repository
      .createQueryBuilder()
      .relation(Game, 'users')
      .of(id)
      .loadMany();
  }
}

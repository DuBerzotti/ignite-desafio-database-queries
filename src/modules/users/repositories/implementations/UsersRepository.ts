import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM

    /**
     * Esse método deve receber o Id de um usuário e retornar os dados do usuário encontrado
     * juntamente com os dados de todos os games que esse usuário possui.
     */
    const user = await this.repository.findOneOrFail({
      where:
        { id: user_id },
      relations: ['games']
    }
    );
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query

    /**
     * Esse método deve retornar a listagem de usuários cadastrados em ordem alfabética (ASC).
     * Lembre-se que aqui deve ser usado raw query para a consulta.
     */
    return this.repository.query('SELECT * FROM users ORDER BY first_name ASC'); 
  }

  async findUserByFullName({
    // Complete usando raw query

    /**
     * Esse método deve receber `first_name` e `last_name` e retornar um usuário que possua os mesmos `first_name` e `last_name`.
     * Aqui você deve encontrar o usuário ignorando se o argumento passado está em caixa alta ou não. 
     * 
     * Por exemplo, suponhamos que existe um usuário onde o `first_name` é `Danilo` e o `last_name` é `Vieira`. 
     * O método deve retornar o usuário mesmo que os argumentos passados sejam `daNiLo` para `first_name` e `vIeiRA` para `last_name`.
     * Essa consulta deve ser realizada utilizando raw query e você pode buscar pelo uso do LOWER no Postgres para resolver esse problema.
     */
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * FROM users 
    WHERE LOWER(first_name) = LOWER('${first_name}') 
    AND LOWER(last_name) = LOWER('${last_name}')`); 
  }
}

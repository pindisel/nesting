import { UserRepositories } from './user.repositories';

describe('UserRepositories', () => {
  it('should be defined', () => {
    expect(new UserRepositories()).toBeDefined();
  });
});

import { describe, expect } from 'vitest';
import { test } from '../tests';

const PROJECT_NAME = 'test-project-name';

describe('Project fetching', () => {
  test('Fetch list of projects', async ({ server, manyProjects }) => {
    const response = await server.inject({
      url: '/project',
      method: 'GET',
    });

    const { body } = response;
    const parsedBody = JSON.parse(body);

    expect(parsedBody).toEqual(manyProjects);
  });
});

describe('Project creating', () => {
  test('Cannot create project without payload', async ({ server }) => {
    const response = await server.inject({
      url: '/project',
      method: 'POST',
    });

    const { statusCode } = response;
    const projectsCount = await server.database.project.count();

    expect(statusCode).toBe(400);
    expect(projectsCount).toBe(0);
  });

  test('Cannot create project with an empty name', async ({ server }) => {
    const response = await server.inject({
      url: '/project',
      method: 'POST',
      payload: { name: '' },
    });

    const { statusCode } = response;
    const projectsCount = await server.database.project.count();

    expect(statusCode).toBe(400);
    expect(projectsCount).toBe(0);
  });

  test('Create project with a valid payload', async ({ server }) => {
    const response = await server.inject({
      url: '/project',
      method: 'POST',
      payload: { name: PROJECT_NAME },
    });

    const { body, statusCode } = response;
    const parsedBody = JSON.parse(body);
    const projectsCount = await server.database.project.count();

    expect(statusCode).toBe(201);
    expect(parsedBody).toEqual({ id: parsedBody.id, name: PROJECT_NAME });
    expect(projectsCount).toBe(1);
  });

  test('Cannot create project with the same name', async ({ server }) => {
    await server.database.project.create({ data: { name: PROJECT_NAME } });

    const response = await server.inject({
      url: '/project',
      method: 'POST',
      payload: { name: PROJECT_NAME },
    });

    const { statusCode } = response;
    const projectsCount = await server.database.project.count();

    expect(statusCode).toBe(400);
    expect(projectsCount).toBe(1);
  });
});

import model from '../../models/userModels.js';
import connection from '../../mysql/dbManager.js';
import {expect,jest, test} from '@jest/globals';



const mockUser = {
    username: "mock",
    password: '1234',
    role: 'user'
}

describe('usermodel testing', ()=>{

    // spy 
   // const spyConnectionQuery = jest.spyOn(connection, 'query').mockImplementation(()=> Promise.resolve([]));
    let spyConnectionQuery = jest.spyOn(connection, 'query');
    // sin el espia NO es posible testear una fiuncion real

// before

    beforeEach(()=> {
        spyConnectionQuery.mockReset();
    });

    describe('Method', ()=>{

        test('should invoke query mthod with user parameter', async ()=>{
            spyConnectionQuery.mockImplementation(()=> Promise.resolve([]));
            const result = await model.createUser(mockUser); 
            

            expect(connection.query).toBeCalledWith( 'call insert_user(?,?,?)',
            [mockUser.username, mockUser.password, mockUser.role])
        })
        test('should return inserted user_id when a valid user is set',async ()=>{

            spyConnectionQuery.mockImplementation(()=> Promise.resolve([{insertID: 1}]));

           // const result = JSON.parse(await model.createUser(mockUser));
            const result = await model.createUser(mockUser);
           
            expect(result[0].insertID).toBe(1);
        });
        test('should throw an error with message "any message"',  async ()=> {
            spyConnectionQuery.mockImplementation(()=> Promise.reject([{}]));

            try {
                await model.createUser({username: ' '});

            } catch (error) {
                expect(error).toBeTruthy();
            }
        });
       /*  test('should throw an error with message "any message"',  async ()=> {
            spyConnectionQuery.mockImplementation(()=> Promise.reject([{}]));

            expect.assertions(1);
            expect( ()=> await model.createUser(mockUser)).toThrow(('error'));
        }); */
    });

    describe('Login method', ()=>{
        const query = 'select check_user(?,?)'
        test('should invoke query method with user parameter', async ()=>{
            spyConnectionQuery.mockImplementation(()=> Promise.resolve([]));
             await model.loginUser(mockUser); 
            
            expect(spyConnectionQuery).toBeCalledWith( query,
            [mockUser.username,
             mockUser.password])
        });

        test('should return 1 when username and password are correct', async ()=>{
            spyConnectionQuery.mockImplementation(()=> Promise.resolve(1));
            const result = await model.loginUser(mockUser);
            expect(result).toBe(1);
        });
        
    })
})
import {screen, render, within} from '@testing-library/react'
import UserList from './UserList'

function renderComponenet(){
     const users=[
        {name: 'jane', email: 'jane@jane.com}'},
        {name: 'sam', email: 'sam@sam.com'},
    ];
    render(<UserList users={users}/>);
    return {
        users,
    }

}

test('render one row per user',()=>{
    //Render the component

   renderComponenet()
    //const {container}=   render(<UserList users={users}/>); // de structure bec table come under auto div tag

    //Find all the rows in the table
    //screen.logTestingPlaygroundURL();
     const rows = within(screen.getByTestId('users')).getAllByRole('row');  // --> data-testid method 1
    
    //const rows = container.querySelectorAll('tbody tr')  //--> method 2 container.querySelector()

    //Assertion: correct number of row in table

    expect(rows).toHaveLength(2);

});

test('render the email and name of each user',()=>{
     const {users} =renderComponenet();

    for(let user of users){
        const name = screen.getByRole('cell',{name: user.name});
        const email = screen.getByRole('cell', {name: user.email});

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
});

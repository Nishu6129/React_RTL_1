import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two input and a button',()=>{
    //render the component
    render(<UserForm/>);

    //Maniulated the component or find an element in it.
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    //Assertion - make sure the compoent is doing what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();

})

test('it calls onUserAdd when the form is submitted', async () =>{
    // mock function

    const mock = jest.fn();

    // Try to render my component

    render(<UserForm onUserAdd={mock}/>)

    //Find te 2 inputs
    const nameInput = screen.getByRole('textbox',{
        name: /name/i,
    });
    const emailInput = screen.getByRole('textbox',{
        name: /email/i,
    });

  

    //Simulate typing in a name

    await user.click(nameInput);
    user.keyboard('jane');

    //Simualate typing in an email
    await user.click(emailInput);
    user.keyboard('jane@jane.com')

    // Find the submit button 
    const submitButton = screen.getByRole('button');

    //Simulate form submission:
    await user.click(submitButton);

    //Assertion make sure 'onUserAdd' gets called with email/name
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name: 'jane', email: 'jane@jane.com'})


});


test('emties the 2 inputs when form is submitted',async ()=>{
    render(<UserForm onUserAdd={()=>{}}/>)

    const nameInput = screen.getByRole('textbox',{name:/name/i});
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    const button = screen.getByRole('button');

    await user.click(nameInput);
    await user.keyboard('jane');

    await user.click(emailInput);
    await user.keyboard('jane@jane.com');


    await user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');


})
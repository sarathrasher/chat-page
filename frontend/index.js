console.log("Make me do things!");

const socket = new WebSocket('ws://localhost:3001');

var username = prompt('What is your username?');

let $messageContainer = $('.chat-message-list');
let $formContainer = $('[data-chat="chat-form"]')
let $messageInput = $('[data-chat="message-input"]');

let drawMessage = ({
    user: u,
    timestamp: t,
    message: m
  }) => {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });
    // if (this is me?) {
    //   $messageRow.addClass('me');
    // }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: t.toString()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));
    let $img = $('<img>', {
      src: 'https://avatars3.githubusercontent.com/u/794113?s=64&v=4',
      title: u
    });
    $messageRow.append($img);
    $messageRow.append($message);
    return $messageRow;
  };

socket.addEventListener('open', () => {
  console.log('You have connected.');
});

console.log($formContainer);

$formContainer.on('submit', (event) => {
  event.preventDefault();
  let formData = {user: username, message: $messageInput.val(), timestamp: new Date()}
  console.log(formData);
  socket.send(JSON.stringify(formData));
})

socket.addEventListener('message', (event) => {
  console.log(event.data);
  let newMessage = drawMessage(JSON.parse(event.data));
  $messageContainer.append(newMessage);
  newMessage.get(0).scrollIntoView();
});
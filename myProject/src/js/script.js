
function initializeEthers() {
  if (typeof window.ethers !== 'undefined') {
    const { ethers } = window;

    if (window.ethereum && window.ethereum.isMetaMask) {

      // Request MetaMask to connect
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          connectToContract(ethers);
        })
        .catch((error) => {
          console.error('MetaMask connection request rejected:', error);
        });
    } else {
      console.error('MetaMask not detected.');
      // Handle the case where MetaMask is not detected
    }
    
  } else {
    console.error('ethers object is not available.');
    // Handle the case where ethers is not available
  }
}

function connectToContract(ethers) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractAddress = '0xfb9Cc62F982317396077EB3c75D76079342EC3FD'; // Replace with your deployed contract address
  const contractABI = [
    // contract ABI's
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tasks",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

  const todoContract = new ethers.Contract(contractAddress, contractABI, signer);

  // Once connected, start working with the contract
  setupEventListeners(todoContract);
  fetchTasks(todoContract);
}

function setupEventListeners(todoContract) {
  document.getElementById('add-item').addEventListener('click', async () => {
    try {
      const description = document.querySelector('input[type="text"]').value;
      await todoContract.addTask(description);
      fetchTasks(todoContract); // Reload the task list
      alert('Task added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task. Please try again.');
    }
  });

  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('mark-done-button')) {
      const taskIndex = event.target.getAttribute('data-task-index');
      const task = { index: taskIndex };
      markTaskAsCompleted(todoContract, task);
    }
  });
}

async function fetchTasks(todoContract) {
  try {
    const pendingTasks = await todoContract.getPendingTasks();
    displayTasks(pendingTasks);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch tasks. Please try again.');
  }
}

function displayTasks(tasks) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear previous tasks

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('todolist-items');

    const taskName = document.createElement('h3');
    taskName.textContent = task.description;

    const markDoneButton = document.createElement('div');
    markDoneButton.classList.add('secondary-button', 'tooltip-btn', 'mark-done-button');
    markDoneButton.setAttribute('data-task-index', index); // Set task index as data attribute
    markDoneButton.setAttribute('data-tooltip', 'Mark done');
    markDoneButton.innerHTML = '<i class="fa-solid fa-square-check icon"></i>';

    taskElement.appendChild(taskName);
    taskElement.appendChild(markDoneButton);
    todoList.appendChild(taskElement);
  });
}


function markTaskAsCompleted(todoContract, task) {
  try {
    todoContract.completeTask(task.index)
      .then(() => {
        fetchTasks(todoContract); // Reload the task list
        alert('Task marked as completed!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to mark task as completed. Please try again.');
      });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to mark task as completed. Please try again.');
  }
}

// Initialize when the script is loaded
initializeEthers();
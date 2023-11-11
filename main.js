// Framework functions
const SUI = {
    GUI: {
       menus: [],
    },
 
    panel: class panel {
       constructor(title, id, top, left) {
          this.title = title;
          this.id = id;
          this.top = top;
          this.left = left;
          this.elements = [];
       }
 
       addButton(label, callback) {
          const button = {
             type: 'button',
             label,
             callback,
          };
          this.elements.push(button);
       }
 
       addSlider(label, min, max, value, onChange) {
          const slider = {
             type: 'slider',
             label,
             min,
             max,
             value,
             onChange,
          };
          this.elements.push(slider);
       }
 
       addText(content) {
          const text = {
             type: 'text',
             content,
          };
          this.elements.push(text);
       }
 
       addInput(label, initialValue, onInput) {
          const input = {
             type: 'input',
             label,
             value: initialValue,
             onInput,
          };
          this.elements.push(input);
       }
    },
 
    getMenu(menu) {
       return document.getElementById(menu.id);
    },
 
    toggleMenu(menu) {
       if (SUI.getMenu(menu).style.display === 'none') {
          SUI.getMenu(menu).style.display = 'block';
       } else {
          SUI.getMenu(menu).style.display = 'none';
       }
    },
 
    clearMenu(menu) {
       menu.elements = []
    },
 
    createMenu(title, top, left) {
       const menu = new this.panel(title, title.split(' ').join('-') + '-SUI', top, left);
       this.GUI.menus.push(menu);
 
       // Add functions to the menu object
       menu.addButton = (label, callback) => {
          const button = {
             type: 'button',
             label,
             callback,
          };
          menu.elements.push(button);
       };
 
       menu.addSlider = (label, min, max, value, onChange) => {
          const slider = {
             type: 'slider',
             label,
             min,
             max,
             value,
             onChange,
          };
          menu.elements.push(slider);
       };
 
       menu.addText = (content) => {
          const text = {
             type: 'text',
             content,
          };
          menu.elements.push(text);
       };
 
       menu.addInput = (label, initialValue, onInput) => {
          const input = {
             type: 'input',
             label,
             value: initialValue,
             onInput,
          };
          menu.elements.push(input);
       };
 
       return menu;
    },
 
    createOverlay(title) {
        if (!this.GUI.overlay) {
            return this.GUI.overlay = { "title": title, id: "overlayDiv", loaded : false }
        } else {
            console.error('already one overlay')
        }
    },
 
    render() {
       this.GUI.menus.forEach((menu) => {
          // Check if the menu already exists in the DOM
          let menuContainer = document.getElementById(menu.id);
 
          // If the menu already exists, update its content
          if (menuContainer) {
             // Clear existing elements before updating
             menuContainer.innerHTML = '';
          } else {
             // If the menu doesn't exist, create a new one
             menuContainer = document.createElement('div');
             menuContainer.id = menu.id;
             menuContainer.style.position = 'absolute';
             menuContainer.style.top = menu.top;
             menuContainer.style.left = menu.left;
             menuContainer.style.padding = '20px';
             menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
             menuContainer.style.color = '#fff';
             menuContainer.style.fontSize = '15px';
             menuContainer.style.zIndex = '9999';
             menuContainer.style.borderRadius = '10px';
             menuContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
             menuContainer.style.width = '300px';
             document.body.appendChild(menuContainer);
          }
 
          // Create and append menu header
          const menuHeader = document.createElement('div');
          menuHeader.id = `${menu.id}header`;
          menuHeader.style.fontWeight = 'bold';
          menuHeader.style.textAlign = 'center';
          menuHeader.style.fontSize = '25px';
          menuHeader.style.cursor = 'move';
          menuHeader.style.padding = '5px';
          menuHeader.textContent = menu.title;
          menuContainer.appendChild(menuHeader);
 
          // Rest of the rendering logic (creating elements, appending to the menuContainer, etc.)
          menu.elements.forEach((element) => {
             const elemContainer = document.createElement('div');
             elemContainer.style.marginBottom = '10px';
 
             if (element.type === 'button') {
                const buttonElem = document.createElement('div');
                buttonElem.className = 'modMenuItem';
                buttonElem.style.cursor = 'pointer';
                buttonElem.style.padding = '10px';
                buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                buttonElem.style.borderRadius = '5px';
                buttonElem.style.transition = 'background-color 0.3s ease';
                buttonElem.textContent = element.label;
 
                buttonElem.addEventListener('mouseenter', () => {
                   buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                });
 
                buttonElem.addEventListener('mouseleave', () => {
                   buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                });
 
                buttonElem.addEventListener('click', element.callback);
 
                elemContainer.appendChild(buttonElem);
             } else if (element.type === 'slider') {
                const sliderHeader = document.createElement('div');
                sliderHeader.style.cursor = 'move';
                sliderHeader.style.padding = '5px';
                sliderHeader.textContent = element.label;
                elemContainer.appendChild(sliderHeader);
 
                const sliderInput = document.createElement('input');
                sliderInput.type = 'range';
                sliderInput.min = element.min;
                sliderInput.max = element.max;
                sliderInput.value = element.value;
 
                const sliderValueSpan = document.createElement('span');
                sliderValueSpan.textContent = element.value;
                sliderValueSpan.style.float = 'right';
 
                sliderInput.style.width = '100%';
                sliderInput.style.height = '20px';
                sliderInput.style.padding = '0';
                sliderInput.style.margin = '0';
                sliderInput.style.appearance = 'none';
                sliderInput.style.background = 'transparent';
                sliderInput.style.border = 'none';
                sliderInput.style.cursor = 'pointer';
                sliderInput.style.borderRadius = '5px';
                sliderInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                sliderInput.style.transition = 'background-color 0.3s ease';
 
                sliderInput.addEventListener('input', () => {
                   element.onChange(sliderInput.value);
                   sliderValueSpan.textContent = sliderInput.value;
                });
 
                elemContainer.appendChild(sliderInput);
                sliderHeader.appendChild(sliderValueSpan);
             } else if (element.type === 'text') {
                const textElem = document.createElement('div');
                textElem.className = 'modTextItem';
                textElem.style.padding = '5px';
                textElem.style.backgroundColor = 'rgba(115 115 115 / 10%)';
                textElem.style.borderRadius = '5px';
                textElem.textContent = element.content;
                elemContainer.appendChild(textElem);
             } else if (element.type === 'input') {
                const inputLabel = document.createElement('div');
                inputLabel.style.padding = '5px';
                inputLabel.textContent = element.label;
                elemContainer.appendChild(inputLabel);
 
                const inputElem = document.createElement('input');
                inputElem.type = 'text';
                inputElem.value = element.value;
                inputElem.style.width = '100%';
                inputElem.style.height = '20px';
                inputElem.style.padding = '15px';
                inputElem.style.backgroundColor = 'rgba(115 115 115 / 10%)';
                inputElem.style.borderRadius = '5px';
                inputElem.style.border = '0';
                inputElem.style.outline = '0';
                inputElem.style.color = 'white';
                inputElem.addEventListener('input', () => {
                   element.onInput(inputElem.value);
                });
 
                elemContainer.appendChild(inputElem);
             }
 
             menuContainer.appendChild(elemContainer);
          });
 
          document.body.appendChild(menuContainer);
          this.dragElement(menuContainer);
       });
       if (this.GUI.overlay && this.GUI.overlay.loaded == false) {
            const overlayDiv = document.createElement('div');
            overlayDiv.id = 'overlayDiv';
            overlayDiv.style.position = 'fixed';
            overlayDiv.style.top = '0';
            overlayDiv.style.left = '0';
            overlayDiv.style.width = '100%';
            overlayDiv.style.height = '100%';
            overlayDiv.style.backgroundColor = 'rgb(0 0 0 / 70%)';
            overlayDiv.style.zIndex = '9998';
            overlayDiv.style.backdropFilter = 'blur(5px)';
    
            const header = document.createElement('div');
            header.id = 'overlayHeader';
            header.style.color = 'white';
            header.style.textAlign = 'center';
            header.style.padding = '10px';
            header.style.fontWeight = 'bold';
            header.style.fontSize = '30px';
            header.textContent = this.GUI.overlay.title;
            overlayDiv.appendChild(header);
            document.body.appendChild(overlayDiv);

            // fix
            this.GUI.overlay.loaded = true

            return overlayDiv;
       }
    },
 
 
    dragElement(elmnt) {
       let pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
 
       const header = elmnt.querySelector(`#${elmnt.id}header`);
       if (header) {
          header.style.cursor = 'move';
          header.onmousedown = dragMouseDown;
       } else {
          elmnt.style.cursor = 'move';
          elmnt.onmousedown = dragMouseDown;
       }
 
       function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
       }
 
       function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
          elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
       }
 
       function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
       }
    }
 };

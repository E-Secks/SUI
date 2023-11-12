// Framework functions
const SUI = {
    GUI: {
        menus: [],
    },
    utils : {
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
    },
    panel: class panel {
        constructor(title, top, left) {
            this.title = title;
            this.id = title.split(' ').join('-') + '-SUI';
            this.top = top;
            this.left = left;
            this.elements = [];
            SUI.GUI.menus.push(this);
        }
        get element() {
            return document.getElementById(this.id);
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
        addText(content, size) {
            const text = {
                type: 'text',
                size,
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
        addCheckbox(label, checked, onChange) {
          const checkbox = {
              type: 'checkbox',
              label,
              checked,
              onChange,
          };
          this.elements.push(checkbox);
      }
 
        // New method to add a color picker
        addColorPicker(label, color, onChange) {
          const colorPicker = {
              type: 'colorPicker',
              label,
              color,
              onChange,
          };
          this.elements.push(colorPicker);
        }
        clear() {
            this.elements = []
        }
        toggle() {
            if (this.element.style.display === 'none') {
                this.element.style.display = 'block';
            } else {
                this.element.style.display = 'none';
            }
        }
    },
    overlay: class overlay {
        constructor(title) {
            if (!SUI.GUI.overlay) {
                this.title = title
                this.id = 'overlayDiv'
                this.loaded = false
                SUI.GUI.overlay = {
                    "title": title,
                    id: "overlayDiv",
                    loaded: false
                }
            } else {
                console.error('already one overlay')
            }
        }
        get element() {
            return document.getElementById(this.id);
        }
        toggle() {
            if (this.element.style.display === 'none') {
                this.element.style.display = 'block';
            } else {
                this.element.style.display = 'none';
            }
        }
    },
    renderer : {
       elements : {
         renderLabel(element) {
            const label = document.createElement('div');
            label.style.padding = '5px';
            label.textContent = element.label;
            return label
         },
         renderButton(element) {
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
             return buttonElem
         },
         renderSlider(element) {
             const sliderInput = document.createElement('input');
             sliderInput.type = 'range';
             sliderInput.min = element.min;
             sliderInput.max = element.max;
             sliderInput.value = element.value;
 
             let label = this.renderLabel(element)
             const sliderValueSpan = document.createElement('span');
             sliderValueSpan.textContent = element.value;
             sliderValueSpan.style.float = 'right';
             label.appendChild(sliderValueSpan);
 
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
             return { label, sliderInput }
         },
         renderText(element) {
             const textElem = document.createElement('div');
             textElem.className = 'modTextItem';
             textElem.style.padding = '5px';
             if (element.size !== undefined) {
                textElem.fontSize = element.size;
             }
             textElem.style.backgroundColor = 'rgba(115 115 115 / 10%)';
             textElem.style.borderRadius = '5px';
             textElem.textContent = element.content;
             return textElem
         },
         renderInput(element) {
             const inputLabel = document.createElement('div');
             inputLabel.style.padding = '5px';
             inputLabel.textContent = element.label;
 
             const inputElem = document.createElement('input');
             inputElem.type = 'text';
             inputElem.value = element.value;
             inputElem.style.width = '100%';
             inputElem.style.height = '20px';
             inputElem.style.padding = '5px';
             inputElem.style.backgroundColor = 'rgba(115 115 115 / 10%)';
             inputElem.style.borderRadius = '5px';
             inputElem.style.border = '0';
             inputElem.style.outline = '0';
             inputElem.style.color = 'white';
             inputElem.addEventListener('input', () => {
                 element.onInput(inputElem.value);
             });
 
             return { inputElem, inputLabel }
         },
         renderCheckbox(element) {
             const checkboxLabel = document.createElement('div');
             checkboxLabel.style.padding = '5px';
             checkboxLabel.textContent = element.label;
 
             const checkboxInput = document.createElement('input');
             checkboxInput.type = 'checkbox';
             checkboxInput.checked = element.checked;
 
             checkboxInput.addEventListener('change', () => {
                 element.onChange(checkboxInput.checked);
             });
 
             return { checkboxInput, checkboxLabel }
         },
         renderColorPicker(element) {
             const colorPickerLabel = document.createElement('div');
             colorPickerLabel.style.padding = '5px';
             colorPickerLabel.textContent = element.label;
      
             const colorPickerInput = document.createElement('input');
             colorPickerInput.type = 'color';
             colorPickerInput.value = element.color;
      
             colorPickerInput.addEventListener('input', () => {
                 element.onChange(colorPickerInput.value);
             });
      
             return { colorPickerInput, colorPickerLabel }
         }
       },
       renderElements(menu, menuContainer) {
          const fragment = document.createDocumentFragment();
 
          menu.elements.forEach((element) => {
             const elemContainer = document.createElement('div');
             elemContainer.style.marginBottom = '10px';
 
             if (element.type === 'button') {
                let buttonElem = SUI.renderer.elements.renderButton(element);
                element.element = elemContainer.appendChild(buttonElem);
             } else if (element.type === 'slider') {
                let slider = SUI.renderer.elements.renderSlider(element);
                element.label.element = elemContainer.appendChild(slider.label);
                element.element = elemContainer.appendChild(slider.sliderInput);
             } else if (element.type === 'text') {
                let textElem = SUI.renderer.elements.renderText(element);
                element.element = elemContainer.appendChild(textElem);
             } else if (element.type === 'input') {
                let input = SUI.renderer.elements.renderInput(element);
                element.label.element = elemContainer.appendChild(input.inputLabel);
                element.element = elemContainer.appendChild(input.inputElem);
             } else if (element.type === 'checkbox') {
                let checkbox = SUI.renderer.elements.renderCheckbox(element);
                element.label.element = elemContainer.appendChild(checkbox.checkboxLabel);
                element.element = elemContainer.appendChild(checkbox.checkboxInput);
             } else if (element.type === 'colorPicker') {
                let colorPicker = SUI.renderer.elements.renderColorPicker(element);
                element.label.element = elemContainer.appendChild(colorPicker.colorPickerLabel);
                element.element = elemContainer.appendChild(colorPicker.colorPickerInput);
             }
 
             fragment.appendChild(elemContainer);
          });
 
          menuContainer.appendChild(fragment);
       },
 
       renderOverlay() {
          if (SUI.GUI.overlay && SUI.GUI.overlay.loaded == false) {
             const overlayDiv = document.createElement('div');
             overlayDiv.id = 'overlayDiv';
             overlayDiv.style.position = 'fixed';
             overlayDiv.style.top = '0';
             overlayDiv.style.left = '0';
             overlayDiv.style.width = '100%';
             overlayDiv.style.height = '100%';
             overlayDiv.style.backgroundColor = 'rgb(0 0 0 / 20%)';
             overlayDiv.style.zIndex = '9998';
             overlayDiv.style.backdropFilter = 'blur(5px)';
 
             const header = document.createElement('div');
             header.id = 'overlayHeader';
             header.style.color = 'white';
             header.style.textAlign = 'center';
             header.style.padding = '10px';
             header.style.fontWeight = 'bold';
             header.style.fontFamily = "Rubik, sans-serif";
             header.style.fontSize = '30px';
             header.textContent = SUI.GUI.overlay.title;
             overlayDiv.appendChild(header);
             document.body.appendChild(overlayDiv);
 
             // fix
             SUI.GUI.overlay.loaded = true;
 
             return overlayDiv;
          }
       },
 
       renderPanels() {
          SUI.GUI.menus.forEach((menu) => {
             let menuContainer = document.getElementById(menu.id);
 
             if (!menuContainer) {
                menuContainer = document.createElement('div');
                menuContainer.id = menu.id;
                menuContainer.style.position = 'absolute';
                menuContainer.style.top = menu.top;
                menuContainer.style.left = menu.left;
                menuContainer.style.padding = '20px';
                menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                menuContainer.style.fontFamily = "Rubik, sans-serif";
                menuContainer.style.color = '#fff';
                menuContainer.style.fontSize = '15px';
                menuContainer.style.zIndex = '9999';
                menuContainer.style.borderRadius = '10px';
                menuContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
                menuContainer.style.width = '300px';
                document.body.appendChild(menuContainer);
             } else {
                menuContainer.innerHTML = '';
             }
 
             const menuHeader = document.createElement('div');
             menuHeader.id = `${menu.id}header`;
             menuHeader.style.fontWeight = 'bold';
             menuHeader.style.textAlign = 'center';
             menuHeader.style.fontSize = '25px';
             menuHeader.style.cursor = 'move';
             menuHeader.style.padding = '5px';
             menuHeader.textContent = menu.title;
             menuContainer.appendChild(menuHeader);
 
             this.renderElements(menu, menuContainer);
 
             document.body.appendChild(menuContainer);
             SUI.utils.dragElement(menuContainer);
          });
       },
 
       render() {
          this.renderOverlay();
          this.renderPanels();
       },
    },
 };
 

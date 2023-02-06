const template = document.createElement('template');
template.innerHTML = `<div id="addEventForm">
    <form>
    <div class="form-group row mb-3">
        <label for="staticOwner" class="col-sm-4 col-form-label">Owner</label>
        <div class="col-sm-8">
        <input type="text" readonly class="form-control-plaintext" id="staticOwner" value="..Your Name">
        </div>
    </div>
    <div class="form-group row mb-3">
        <label for="inputName" class="col-sm-4 col-form-label">Event Name</label>
        <div class="col-sm-8">
        <input type="text" class="form-control" id="inputName" placeholder="Name">
        </div>
    </div>
    <div class="form-group row mb-3" id="datepicker">
        <label for="inputDate" class="col-sm-4 col-form-label">Select Your Days</label>
        <div class="col-sm-8">
           <!-- <input type="date" class="datepicker"  /> -->
           <input type="text" name="datepicker">
        </div> 
      
    </div>
    <div class="form-group row mb-3" id="rangeInputGroup">
    </div>

    <div class="row gx-5" id="slots">
        <!-- <div class="col-sm-12" >
        </div> -->
    </div>
    </form>
</div>`

const inputRangeTemplate = document.createElement('template');
inputRangeTemplate.innerHTML = `

    <label for="inputDate" class="col-sm-4 col-form-label">Select Your Times</label>
    <div class="col-sm-8">
        <input type="time" id="startTimeInput" required>
        <span>TO</span>
        <input type="time" id="endTimeInput" required>
    </div>

`

const slotTemplate = document.createElement('template');
slotTemplate.innerHTML = `
    
        <p class="slot-date"></p>
        <div class="row">
            <div class="col-6 AM bold selected-color">
                AM
            </div>
            <div class="col-6 PM">
                PM
            </div>
        
            <div class="col-12 am-slots">
                
            </div>
            <div class="col-12 pm-slots hidden">
                
            </div>
        </div>
  
`;

class NewEventForm extends HTMLElement{

    eventObj = {
        name: "",
        owner_name: "",
        owner_email: "",
        date: new Date().toISOString().split("T")[0],
        timeslots: []
    }

    slotContainer = null
    elem = null

    constructor(){
        super();
        // this.attachShadow({ mode: 'open' });
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.innerHTML = template.innerHTML
        this.slotContainer = this.querySelector('#slots')
        this.elem = this.querySelector('input[name="datepicker"]');
    }

    connectedCallback(){
        const datepicker = new Datepicker(this.elem, {
            maxNumberOfDates : 10,
            todayHighlight: true,
            dateDelimiter: ',',
            todayBtn: true
        });
        this.appendDoneBtn(this.elem)
        // const datepickerContainer = this.querySelector('.datepicker');
        // datepickerContainer.min = new Date().toISOString().split("T")[0];
        // datepickerContainer.valueAtDate = datepickerContainer.min
        // datepickerContainer.addEventListener('change', (e) => this.buildSlotObj(e))//this.addSlot(e))
    }

    appendDoneBtn(parent) {
        parent.addEventListener('click', (e) => {
            const datepickerControls = this.querySelector('.datepicker-footer > .datepicker-controls')
            if (datepickerControls.querySelector('.doneBtn')){
                return
            }

            const doneBtn = document.createElement('button');
            doneBtn.textContent = "Done"
            doneBtn.classList.add('doneBtn');
            doneBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.buildSlotObj();
                this.addTimeRangeInput();
            });
            datepickerControls.appendChild(doneBtn)
        });
    }

    buildSlotObj(){
        let dates = this.elem.value;
        dates = dates.split(',')
        dates.forEach(date => {
            const slotObj = {
                date,
                slots:[]
            }
            this.eventObj['timeslots'].push(slotObj)
        });
        console.log(this.eventObj)
    }

    addTimeRangeInput(){
        const rangeInputGroup = this.querySelector('#rangeInputGroup')
        rangeInputGroup.innerHTML = inputRangeTemplate.innerHTML
    }

    // buildSlotObj(e){
    //     const val = e.target.value;
    //     const date = new Date(val).toISOString().split("T")[0];
    //     const slotObj = {
    //         date,
    //         slots: []
    //     }
    //     this.eventObj['timeslots'].push(slotObj)
    //     this.arrangeSlots()
    //     this.clearSlotContainer()
    //     this.eventObj.timeslots.forEach(slot => {
    //         this.addSlot(slot.date)
    //     })
    // }

    arrangeSlots(){
        let timeSlotArray = this.eventObj['timeslots']
        timeSlotArray.sort(function(a,b){
            return new Date(a.date) - new Date(b.date)
        })
        this.eventObj['timeslots'] = timeSlotArray
    }

    clearSlotContainer(){
        this.slotContainer.innerHTML = ''
    }

    addSlot(val){
        const slot = document.createElement('div');
        slot.innerHTML = slotTemplate.innerHTML;
        slot.classList.add('col-4','slot')
        
        const slotDate = slot.querySelector('.slot-date');
        slotDate.textContent = val;
        
        this.slotContainer.appendChild(slot);

        const btn_am = slot.querySelector('.AM');
        const btn_pm = slot.querySelector('.PM');

        const am_container = slot.querySelector('.am-slots');
        const pm_container = slot.querySelector('.pm-slots');

        this.addSlotEl(am_container,pm_container, val);

        btn_am.addEventListener('click', () => {
            am_container.classList.remove('hidden')
            btn_am.classList.add('bold', 'selected-color')

            pm_container.classList.add('hidden');
            btn_pm.classList.remove('bold', 'selected-color');
        });
        btn_pm.addEventListener('click', () => {
            pm_container.classList.remove('hidden')
            btn_pm.classList.add('bold', 'selected-color')

            am_container.classList.add('hidden');
            btn_am.classList.remove('bold', 'selected-color');
        });


    }

    addSlotEl(am_container, pm_container, date){
        
        for(let hour = 1; hour <= 24; hour++){
            const el = document.createElement('div')
            el.classList.add('hour')

            if (hour <= 12){
                el.textContent = hour + ' AM'
                am_container.appendChild(el)
                el.addEventListener('click', () => {
                    this.add_remove_time(date,hourm,'AM');
                    el.classList.toggle('selected-bg')
                })
            }else{
                el.textContent = (hour-12) + ' PM'
                pm_container.appendChild(el)
                el.addEventListener('click', () => {
                    this.add_remove_time(date,hour, 'PM');
                    el.classList.toggle('selected-bg')
                })
            }
        }
    }

    add_remove_time(date,hour, ampm){
        this.convertMilitrayHourToRange(date,hour, ampm)
    }

    convertMilitrayHourToRange(date,hour, ampm){
        const rangeObj = {
            start: {
                hour: 0,
                time: null
            },
            end: {
                hour: 0,
                time: null
            }
        }

        const dateObj = moment(date).utc().startOf('day');
        rangeObj.start.hour = hour - 1;
        rangeObj.end.hour = hour;

        for(let timeObj in rangeObj){
            const formattedHour = ("0" + timeObj.hour).slice(-2);
            const time = `${formattedHour}:00`;
            const momentTime = moment(time, 'HHmm').format('HH:mm');
            const resultTime = dateObj.add(momentTime)
            rangeObj[timeObj]['time'] = resultTime
        }
        console.log(rangeObj)
    }
}

window.customElements.define('new-event-form', NewEventForm)


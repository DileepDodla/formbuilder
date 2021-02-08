import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { field, value } from '../../global.model';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit {
  show: boolean;
  success: boolean;
  report: boolean;
  reports: any;
  item: value;
  fieldModels: Array<field>;
  modelFields: Array<field>;
  model: any;
  recipients: string;

  constructor(private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.show = false;
    this.success = false;
    this.report = false;
    this.reports = [];
    this.item = { label: "", value: "" };
    this.fieldModels = [
      {
        "type": "text",
        "icon": "fa-font",
        "label": "Text",
        "placeholder": "",
        "className": "form-control",
        "subtype": "text",
        "regex": "",
        "handle": true
      },
      {
        "type": "number",
        "label": "Number",
        "icon": "fa-html5",
        "placeholder": "",
        "className": "form-control",
      },
      {
        "type": "textarea",
        "icon": "fa-text-width",
        "label": "Textarea",
        "placeholder": ""
      },
      {
        "type": "button",
        "icon": "fa-paper-plane",
        "subtype": "submit",
        "label": "Submit"
      }
    ];
    this.modelFields = [];

    if (this.localStorageService.getItem("formData")) {
      this.model = JSON.parse(this.localStorageService.getItem("formData"));
    }
    else {
      this.model = {
        name: '',
        description: '',
        attributes: this.modelFields
      };
    }

    this.recipients = "";
  }

  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {

      if (event.dropEffect === "copy")
        event.data.name = event.data.type + '-' + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  save() {
    this.localStorageService.setItem("formData", JSON.stringify(this.model));
  }

  clear() {
    this.model = {
      name: '',
      description: '',
      attributes: []
    };
    this.localStorageService.clear();
  }

  addValue(values) {
    values.push(this.item);
    this.item = { label: "", value: "" };
  }

  removeField(i) {
    this.model.attributes.splice(i, 1);
  };

  // }

  updateForm() {
    let input = new FormData;
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));

    // this.us.putDataApi('/admin/updateForm',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','App updated successfully','success');
    // });
  }


  initReport() {
    this.report = true;
    let input = {
      id: this.model._id
    }
    // this.us.getDataApi('/admin/allFilledForms',input).subscribe(r=>{
    //   this.reports = r.data;
    //   console.log('reports',this.reports);
    //   this.reports.map(records=>{
    //     return records.attributes.map(record=>{
    //       if(record.type=='checkbox'){
    //         record.value = record.values.filter(r=>r.selected).map(i=>i.value).join(',');
    //       }
    //     })
    //   });
    // });
  }



  toggleValue(item) {
    item.selected = !item.selected;
  }

  submit() {
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      console.log(field.label + '=>' + field.required + "=>" + field.value);
      if (field.required && !field.value && field.type != 'checkbox') {
        // swal('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        let regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          // swal('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if (field.required && field.type == 'checkbox') {
        if (field.values.filter(r => r.selected).length == 0) {
          // swal('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }

      }
    });
    if (!valid) {
      return false;
    }
    console.log('Save', this.model);
    let input = new FormData;
    input.append('formId', this.model._id);
    input.append('attributes', JSON.stringify(this.model.attributes))
    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   swal('Error',error.message,'error');
    // });
  }

}
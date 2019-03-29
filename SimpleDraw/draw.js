  function setTool(tool){
    $(".canvas-ui span").removeClass("active");
    $("#"+tool).addClass("active");
    active_tool = tool;

    if (active_tool=='curve'){
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = stroke_color;

      if (stroke_size==0){
        stroke_size = 1;
        $("#stroke_size").val(stroke_size);
      }
      canvas.freeDrawingBrush.width = stroke_size;
    } else {
      canvas.isDrawingMode = false;
    }
  }


  function add() {
    var red = new fabric.Rect({
      top: 100, left: 0, width: 80, height: 50, fill: "#ff9300", strokeWidth: 1 , stroke: "#ff9300"});
    var blue = new fabric.Rect({
      top: 0, left: 100, width: 50, height: 70, fill: '#0096ff', strokeWidth: 0 , stroke: "#ff9300"});
    var green = new fabric.Rect({
      top: 100, left: 100, width: 60, height: 60, fill: '#009051', strokeWidth: 0 , stroke: "#ff9300"});
    canvas.add(red, blue, green);
  }

  function updateControls(){
    active_obj = canvas.getActiveObject();
    //console.log(active_obj.fill);
    fil_color = active_obj.fill;
    $("#fill_color").val(active_obj.fill);

    stroke_color = active_obj.stroke;
    $("#stroke_color").val(active_obj.stroke);
    $("#stroke").css("border-color", stroke_color);

    stroke_size = parseInt(active_obj.strokeWidth);
    $("#stroke_size").val(active_obj.strokeWidth);
  }

  function setFill(color){
    active_obj = canvas.getActiveObject();
    if (active_obj){
      active_obj.set('fill', color);
      canvas.requestRenderAll();
    }
  }

  function setStroke(color){
    active_obj = canvas.getActiveObject();
    if (active_obj){
      active_obj.set('stroke', stroke_color);
      active_obj.set('strokeWidth', stroke_size);
      canvas.requestRenderAll();
    }
    //canvas.freeDrawingBrush.color = stroke_color;
    $("#stroke").css("border-color", stroke_color);
  }

  function setStrokeSize(size){
    active_obj = canvas.getActiveObject();
    if (active_obj){
      active_obj.set('stroke', stroke_color);
      if (stroke_size > 0){
        active_obj.set('strokeWidth', stroke_size);
      }
      canvas.requestRenderAll();
    }
    if (stroke_size > 0){
      canvas.freeDrawingBrush.width = stroke_size;
    }
  }

  var canvas = this.__canvas = new fabric.Canvas('c');
  canvas.setDimensions({width: 500, height: 500});
  var active_obj, fill_color, stroke_color, stroke_size;
  stroke_color = "#c0c0c0";
  stroke_size = 1;
  var active_tool = 'select';


  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerSize = 8;
  fabric.Object.prototype.cornerStrokeColor = "#48acff";
  fabric.Object.prototype.borderColor = "#48acff";
  fabric.Object.prototype.cornerColor = "white";

  add();


  canvas.on({
    'selection:created': updateControls,
    'selection:updated': updateControls
  });

  $("#select").click(function(){
    setTool("select");
  });

  $("#curve").click(function(){
    setTool("curve");
  });

  var group = $('#group'),
      ungroup = $('#ungroup'),
      multiselect = $('#multiselect'),
      addmore = $('#addmore'),
      discard = $('#discard');

      $("#fill_color").change(function(){
        fill_color = $(this).val();
        console.log("fill color: "+ fill_color);
        setFill(fill_color);
      });

      $("#stroke_color").change(function(){
        stroke_color = $(this).val();
        console.log("stroke color: "+ stroke_color);
        setStroke(stroke_color);
        $("#stroke").css("border-color", stroke_color);
      });

      $("#stroke_size").click(function(){
        stroke_size = parseInt($(this).val());
        console.log("stroke size: "+ stroke_size);
        setStrokeSize(stroke_size);
      });

      addmore.click(function(){
        console.log("add clicked");
        add();
      });

      multiselect.click(function() {
        console.log("multiselect clicked");
        canvas.discardActiveObject();
        var sel = new fabric.ActiveSelection(canvas.getObjects(), {
          canvas: canvas,
        });
        canvas.setActiveObject(sel);
        canvas.requestRenderAll();
      });

      ungroup.click(function() {
        console.log("ungroup clicked");
        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type !== 'group') {
          return;
        }
        canvas.getActiveObject().toActiveSelection();
        canvas.requestRenderAll();
      });

      discard.click(function() {
        console.log("discard clicked");
        active_obj = canvas.getActiveObject();
        canvas.remove(active_obj);
      });

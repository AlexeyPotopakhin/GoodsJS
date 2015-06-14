
var list_id = 0;

$(document).ready(function() {
	// Input
	$("#input_goods").keydown(function(event_object) {
		if(event_object.which == 13) {
			addListItem($("#input_goods").val());
			$("#input_goods").val("");
		}
	});
});

function addListItem(name) {
	var tag_li_start = "<li id='" + list_id + "'>";
	var tag_li_end = "</li>";
	
	var table_start = "<table><tr>";
	var table_end = "</tr></table>";
	
	var checkbox = "<td><input type='checkbox'></td>";
	var text = "<td width='230'><span id='text'>" + name + "</span></td>";
	var button = "<td><button type='button'></button></td>";
	
	var list_item = tag_li_start + table_start + checkbox 
		+ text + button + table_end + tag_li_end;
	
	// Add item to the list
	$("#goods_list").append(list_item);
	
	// Remove button styles
	$("button").button( {
		icons: {
			primary: "ui-icon-closethick"
		},
		text: false
	});
	$("button").hide();
	// Remove button visible events
	$("#" + list_id).mouseenter({id:list_id}, function(event_object) {
		$("#" + event_object.data.id).find("button").show();
	});
	$("#" + list_id).mouseleave({id:list_id}, function(event_object) {
		$("#" + event_object.data.id).find("button").hide();
	});
	// Remove button click event
	$("#" + list_id).find("button").click({id:list_id}, function(event_object) {
		$("#" + event_object.data.id).remove();
	});
	
	// Edit item event
	$("#" + list_id).dblclick({id:list_id}, function(event_object) {
		var value = $("#" + event_object.data.id).find("#text").text();
		var text_box = "<input id='change' value='" + value + "'/>";
		$("#" + event_object.data.id).find("#text").replaceWith("<td width='230' id='text'>" + text_box + "</td>");
		
		// Keys events
		$("#" + event_object.data.id).find("input").keydown({li_id:event_object.data.id, old_text:value}, function(event_object) {
			// Enter key (save text)
			if(event_object.which == 13) {
				var new_text = $("#" + event_object.data.li_id).find("#change").val();
				$("#" + event_object.data.li_id).find("#text").replaceWith("<td width='230' id='text'>" + new_text + "</td>");
			}
			// Esc key (cancel saving)
			else if(event_object.which == 27) {
				$("#" + event_object.data.li_id).find("#text").replaceWith("<td width='230' id='text'>" + event_object.data.old_text + "</td>");
			}
		});
	});
	
	list_id++;
}

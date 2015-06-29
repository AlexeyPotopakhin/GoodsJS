// List item identificator
var list_id = 0;

$(document).ready(function() {
	// Input key Enter event
	$("#input_goods").keydown(function(event_object) {
		if(event_object.which == 13) {
			var input_value = $("#input_goods");
			addListItem(input_value.val());
			input_value.val("");
		}
	});
	
	// Strike out all items event
	$("#strike_out_all").change(function() {
		if($(this).is(":checked")) {
			$(".text").attr("style", "text-decoration:line-through; opacity:0.5;");
			$(".item_checkbox").prop("checked", true);
		}
		else {
  			$(".text").attr("style", "text-decoration:none;");
  			$(".item_checkbox").prop("checked", false);
		}
	});
	
	// Remove all items event
	$("#remove_all_button").click(function() {
		$(".item_checkbox:checked").parentsUntil("#goods_list").remove();
		$("#strike_out_all").prop("checked", false);
	});
});

function addListItem(name) {
	var tag_li_start = "<li id='" + list_id + "'>";
	var tag_li_end = "</li>";
	
	var table_start = "<table><tr>";
	var table_end = "</tr></table>";
	
	var checkbox = "<td><input class='item_checkbox' type='checkbox'></td>";
	var text = "<td id='text_cell' width='230'><span class='text'>" + name + "</span></td>";
	var button = "<td><button class='remove' type='button'></button></td>";
	
	var list_item = tag_li_start + table_start + checkbox 
		+ text + button + table_end + tag_li_end;
	
	// Add item to the list
	$("#goods_list").append(list_item);
	
	var list_ul = $("#" + list_id);


	// Remove button icon
	var remove_button = $("button.remove");
	remove_button.button( {
		icons: {
			primary: "ui-icon-closethick"
		},
		text: false
	});
	remove_button.hide();
	// Remove button visible events
	list_ul.mouseenter({id:list_id}, function(event_object) {
		$("#" + event_object.data.id).find("button.remove").show();
	});
	list_ul.mouseleave({id:list_id}, function(event_object) {
		$("#" + event_object.data.id).find("button.remove").hide();
	});
	// Remove button click event
	list_ul.find("button").click({id:list_id}, function(event_object) {
		$("#" + event_object.data.id).remove();
	});
	
	// Edit item event
	list_ul.find("#text_cell").dblclick({id:list_id}, function(event_object) {
		var list_item = $("#" + event_object.data.id);

		var value = list_item.find(".text").text();
		var text_box = "<input id='change' value='" + value + "'/>";

		list_item.find(".text")
		.replaceWith("<td width='230' class='text'>" + text_box + "</td>");
		
		// Keys events
		list_item.find("input").keydown({old_text:value}, function(event_object) {
			// Enter key (save text)
			if(event_object.which == 13) {
				var new_text = list_item.find("#change").val();

				list_item.find(".text")
				.replaceWith("<td width='230' class='text'>" + new_text + "</td>");
			}
			// Esc key (cancel saving)
			else if(event_object.which == 27) {
				list_item.find(".text")
				.replaceWith("<td width='230' class='text'>" + event_object.data.old_text + "</td>");
			}
		});
	});
	
	// Check box event
	list_ul.find("input:checkbox").change({id:list_id}, function(event_object) {
		if($(this).is(":checked")) {
			$("#" + event_object.data.id).find(".text").attr("style", "text-decoration:line-through; opacity:0.5;");
		}
		else {
			$("#" + event_object.data.id).find(".text").attr("style", "text-decoration:none;");
		}
	});
	
	list_id++;
}

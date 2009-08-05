/**
 * This file is part of 
 * Kimai - Open Source Time Tracking // http://www.kimai.org
 * (c) 2006-2009 Kimai-Development-Team
 * 
 * Kimai is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; Version 3, 29 June 2007
 * 
 * Kimai is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Kimai; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * 
 */

// ============
// TS EXT funcs
// ============

function ts_ext_onload() {
    ts_ext_applyHoverIntent2zefRows();
    ts_ext_resize();
    $('#zefShrink').hover(ts_ext_zefShrinkShow,ts_ext_zefShrinkHide);
    $('#kndShrink').hover(ts_ext_kndShrinkShow,ts_ext_kndShrinkHide);
    $('#zefShrink').click(ts_ext_shrinkZefToggle);
    $('#kndShrink').click(ts_ext_shrinkKndToggle);
    $("#loader").hide();
    
    $('#pct>table>tbody>tr>td>a.preselect#ps'+selected_pct+'>img').attr('src','../skins/standard/grfx/preselect_on.png');
    $('#evt>table>tbody>tr>td>a.preselect#ps'+selected_evt+'>img').attr('src','../skins/standard/grfx/preselect_on.png');
}

function ts_ext_zefShrinkShow() {
    $('#zefShrink').css("background-color","red");
}

function ts_ext_zefShrinkHide() {
    $('#zefShrink').css("background-color","transparent");
}

function ts_ext_kndShrinkShow() {
    $('#kndShrink').css("background-color","red");
}

function ts_ext_kndShrinkHide() {
    $('#kndShrink').css("background-color","transparent");
}

function ts_ext_shrinkZefToggle() {
    logfile("zefshrink");
    (zefShrinkMode)?zefShrinkMode=0:zefShrinkMode=1;
    if (zefShrinkMode) {
        $('#zefShrink').css("background-image","url('../skins/standard/grfx/zefShrink_down.png')");
    } else {
        $('#zefShrink').css("background-image","url('../skins/standard/grfx/zefShrink_up.png')");
    }    ts_ext_set_heightTop();
}

function ts_ext_shrinkKndToggle() {
    logfile("kndshrink");
    (kndShrinkMode)?kndShrinkMode=0:kndShrinkMode=1;
    if (kndShrinkMode) {
        $('#knd, #knd_head').hide();
        $('#kndShrink').css("background-image","url('../skins/standard/grfx/kndShrink_right.png')");
    } else {
        $('#knd, #knd_head').show();
        $('#kndShrink').css("background-image","url('../skins/standard/grfx/kndShrink_left.png')");
    }
    ts_ext_set_tableWrapperWidths();
}

function ts_ext_get_dimensions() {
    scroller_width = 17;
    if (navigator.platform.substr(0,3)=='Mac') {
        scroller_width = 16;
    }

    (kndShrinkMode)?subtableCount=2:subtableCount=3;
    subtableWidth = (pageWidth()-10)/subtableCount-7 ;
    
    zef_w = pageWidth()-24;
    zef_h = pageHeight()-224-headerHeight()-28;

    knd_w = subtableWidth-5; // subtract the space between the panels
    pct_w = subtableWidth-6;
    evt_w = subtableWidth-5;
}

function ts_ext_applyHoverIntent2zefRows() {
    $('#zef tr').hoverIntent({
        sensitivity: 1,
        interval: 500,
        over:
          function() { 
              $('#zef tr').removeClass('hover');
              $(this).addClass('hover');},
        out:
          function() {
              $(this).removeClass('hover');
          }
    });
}

function ts_ext_resize() {
    ts_ext_set_tableWrapperWidths();
    ts_ext_set_heightTop();
}

function ts_ext_set_tableWrapperWidths() {
    ts_ext_get_dimensions();
    // zef: set width of table and faked table head  
    $("#zef_head,#zef").css("width",zef_w);
    $('#zefShrink').css("width",zef_w+2);
    // set width of faked table heads of subtables -----------------
    $("#knd_head").css("width",knd_w-5); // subtract the left padding inside the header
    $("#pct_head").css("width",pct_w-5); // which is 5px
    $("#evt_head").css("width",evt_w-5);
    $("#knd").css("width",knd_w);
    $("#pct").css("width",pct_w);
    $("#evt").css("width",evt_w);
    ts_ext_set_left();
    ts_ext_set_TableWidths();
}

function ts_ext_set_left() {
    
    // push pct/evt subtables in place LEFT
    
    (kndShrinkMode)?leftmargin=0:leftmargin=subtableWidth;
    (kndShrinkMode)?rightmargin=0:rightmargin=7;

    (kndShrinkMode)?kndSkrinkPos=0:kndSkrinkPos=subtableWidth+7;
    
    $("#pct_head,#pct").css("left",leftmargin+rightmargin+10);
    
    $("#evt_head,#evt").css("left",subtableWidth+leftmargin+rightmargin+15); //22
    $('#kndShrink').css("left",kndSkrinkPos);
    
}

function ts_ext_set_heightTop() {
    ts_ext_get_dimensions();
    if (!zefShrinkMode) {
        $("#zef").css("height", zef_h);
        $("#knd,#pct,#evt").css("height","175px");
        $('#kndShrink').css("height","201px");
        // push knd/pct/evt subtables in place TOP
        var subs = pageHeight()-headerHeight()-90+25;
        $("#knd,#pct,#evt").css("top",subs);
        // push faked table heads of subtables in place
        var subs = pageHeight()-headerHeight()-90;    
        $("#knd_head,#pct_head,#evt_head").css("top",subs);
        $('#zefShrink').css("top",subs-10);
        $('#kndShrink').css("top",subs);
    } else {
        $("#zef").css("height", "70px");
        $("#knd_head,#pct_head,#evt_head").css("top",headerHeight()+107);
        $("#knd,#pct,#evt").css("top",headerHeight()+135);
        $("#knd,#pct,#evt").css("height",pageHeight()-headerHeight()-150);
        $('#kndShrink').css("height",pageHeight()-headerHeight()-119);
        $('#zefShrink').css("top",headerHeight()+97);
        $('#kndShrink').css("top",headerHeight()+105);
    }
    
    ts_ext_set_TableWidths();
}

function ts_ext_set_TableWidths() {
    ts_ext_get_dimensions();
    // set table widths   
    ($("#zef").innerHeight()-$("#zef table").outerHeight()>0)?scr=0:scr=scroller_width; // width of zef table depending on scrollbar or not
    $("#zef table").css("width",zef_w-scr);
    ($("#knd").innerHeight()-$("#knd table").outerHeight()>0)?scr=0:scr=scroller_width; // same goes for subtables ....
    $("#knd table").css("width",knd_w-scr);
    ($("#pct").innerHeight()-$("#pct table").outerHeight()>0)?scr=0:scr=scroller_width;
    $("#pct table").css("width",pct_w-scr);
    ($("#evt").innerHeight()-$("#evt table").outerHeight()>0)?scr=0:scr=scroller_width;
    $("#evt table").css("width",evt_w-scr);
    // stretch customer column in faked zef table head
    $("#zef_head > table > tbody > tr > td.knd").css("width", $("div#zef > div > table > tbody > tr > td.knd").width());    
    // stretch project column in faked zef table head
    $("#zef_head > table > tbody > tr > td.pct").css("width", $("div#zef > div > table > tbody > tr > td.pct").width());
}

function ts_ext_triggerchange() {
    if (ts_tss_hook_flag) {
        ts_ext_reloadAllTables();
        ts_chk_hook_flag = 0;
        ts_chp_hook_flag = 0;
        ts_che_hook_flag = 0;
    }
    if (ts_chk_hook_flag) {
        ts_ext_triggerCHK();
        ts_chp_hook_flag = 0;
        ts_che_hook_flag = 0;
    }
    if (ts_chp_hook_flag) {
        ts_ext_triggerCHP();
    }
    if (ts_che_hook_flag) {
        ts_ext_triggerCHE();
    }
    
    ts_tss_hook_flag = 0;
    ts_rec_hook_flag = 0;
    ts_stp_hook_flag = 0;
    ts_chk_hook_flag = 0;
    ts_chp_hook_flag = 0;
    ts_che_hook_flag = 0;
}

function ts_ext_triggerTSS() {
    if ($('.ki_timesheet').css('display') == "block") {
        ts_ext_reloadAllTables();
    } else {
        ts_tss_hook_flag++;
    }
}

// function ts_ext_triggerREC() {
//     logfile("TS: triggerREC");
// }
// 
// function ts_ext_triggerSTP() {
//     logfile("TS: triggerSTP");
// }

function ts_ext_triggerCHK() {
    if ($('.ki_timesheet').css('display') == "block") {
        ts_ext_reloadSubject('zef');
        ts_ext_reloadSubject('knd');
        ts_ext_reloadSubject('pct');
    } else {
        ts_chk_hook_flag++;
    }
}

function ts_ext_triggerCHP() {
    if ($('.ki_timesheet').css('display') == "block") {
        ts_ext_reloadSubject('zef');
        ts_ext_reloadSubject('pct');
    } else {
        ts_chp_hook_flag++;
    }
}

function ts_ext_triggerCHE() {
    if ($('.ki_timesheet').css('display') == "block") {
        ts_ext_reloadSubject('zef');
        ts_ext_reloadSubject('evt');
    } else {
        ts_che_hook_flag++;
    }
}

// preselections for buzzer
function ts_ext_preselect(subject,id,name,kndID,kndName) {
    $('a').blur();
    switch (subject) {
        case "knd":
        // TODO: build filter for project selection (by customer)
            // selected_knd = id;
            // $("#sel_knd").html(name);
            $("#sel_knd").html("select project");
            $("#sel_knd").addClass("none");
        break;
        case "pct":
            selected_knd = kndID;
            selected_pct = id;
            $("#sel_knd").html(kndName);
            $("#sel_pct").html(name);
            $("#sel_knd").removeClass("none");
        break;
        case "evt":
            selected_evt = id;
            $("#sel_evt").html(name);
        break;
    }
    $('#'+subject+'>table>tbody>tr>td>a.preselect>img').attr('src','../skins/standard/grfx/preselect_off.png');
    $('#'+subject+'>table>tbody>tr>td>a.preselect#ps'+id+'>img').attr('src','../skins/standard/grfx/preselect_on.png');
}


// ----------------------------------------------------------------------------------------
// reloads timesheet, customer, project and event tables
//
function ts_ext_reloadSubject(subject) {
    switch (subject) {
        case "zef":
            $.post(ts_ext_path + "processor.php", { axAction: "reload_zef", axValue: 0, id: 0 },
                function(data) { 
                    $("#zef").html(data);
                
                    // set zef table width
                    ($("#zef").innerHeight()-$("#zef table").outerHeight() > 0 ) ? scr=0 : scr=scroller_width; // width of zef table depending on scrollbar or not
                    $("#zef table").css("width",zef_w-scr);
                    // stretch customer column in faked zef table head
                    $("#zef_head > table > tbody > tr > td.knd").css("width", $("div#zef > div > table > tbody > tr > td.knd").width());
                    // stretch project column in faked zef table head
                    $("#zef_head > table > tbody > tr > td.pct").css("width", $("div#zef > div > table > tbody > tr > td.pct").width());
                    ts_ext_applyHoverIntent2zefRows();
                }
            );
    break;
        case "knd":
            $.post(ts_ext_path + "processor.php", { axAction: "reload_knd", axValue: 0, id: 0 },
                function(data) {
                    $("#knd").html(data);
                    ($("#knd").innerHeight()-$("#knd table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#knd table").css("width",knd_w-scr);
                    filter_lists('knd', $('#filt_knd').val());
                }
            );
    break;
        case "pct": 
            $.post(ts_ext_path + "processor.php", { axAction: "reload_pct", axValue: 0, id: 0 },
                function(data) { 
                    $("#pct").html(data);
                    ($("#pct").innerHeight()-$("#pct table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#pct table").css("width",pct_w-scr);
                    $('#pct>table>tbody>tr>td>a.preselect#ps'+selected_pct+'>img').attr('src','../skins/standard/grfx/preselect_on.png');
                    filter_lists('pct', $('#filt_pct').val());
                }
            );
    break;
        case "evt": 
            $.post(ts_ext_path + "processor.php", { axAction: "reload_evt", axValue: 0, id: 0 },
                function(data) { 
                    $("#evt").html(data);
                    ($("#evt").innerHeight()-$("#evt table").outerHeight()>0)?scr=0:scr=scroller_width;
                    $("#evt table").css("width",evt_w-scr);
                    $('#evt>table>tbody>tr>td>a.preselect#ps'+selected_evt+'>img').attr('src','../skins/standard/grfx/preselect_on.png');
                    filter_lists('evt', $('#filt_evt').val());
                }
            );
    break;
    }
}
function ts_ext_reloadAllTables() {
    ts_ext_reloadSubject("zef");
    ts_ext_reloadSubject("knd");
    ts_ext_reloadSubject("pct");
    ts_ext_reloadSubject("evt");
}

// ----------------------------------------------------------------------------------------
// this function is attached to the little green arrows in front of each timesheet record
// and starts recording that event anew
//
function ts_ext_recordAgain(pct,evt,id) {
    $('#zefEntry'+id+'>td>a.recordAgain>img').attr("src","../skins/standard/grfx/loading13.gif");
    hour=0;min=0;sec=0;
    now = Math.floor(((new Date()).getTime())/1000);
    offset = now;
    startsec = 0;
    recstate=1;
    show_stopwatch();
    $('#zefEntry'+id+'>td>a').blur();
    $('#zefEntry'+id+'>td>a').removeAttr('onClick');
 
    $.post(ts_ext_path + "processor.php", { axAction: "record", axValue: pct+"|"+evt, id: 0 },
        function(data) {
                eval(data);
                ts_ext_reloadSubject("zef");
                ts_ext_preselect('pct',pct,pct_name,0,knd_name);
                ts_ext_preselect('evt',evt,evt_name,0,0);
                $("#ticker_knd").html(knd_name);
                $("#ticker_pct").html(pct_name);
                $("#ticker_evt").html(evt_name);
        }
    );
}


// ----------------------------------------------------------------------------------------
// this function is attached to the little green arrows in front of each timesheet record
// and starts recording that event anew
//
function ts_ext_stopRecord(id) {
    recstate=0;
    ticktack_off();
    show_selectors();
    if (id) {
        $('#zefEntry'+id+'>td').css( "background-color", "#F00" );
        $('#zefEntry'+id+'>td>a.stop>img').attr("src","../skins/standard/grfx/loading13_red.gif");     
        $('#zefEntry'+id+'>td>a').blur();
        $('#zefEntry'+id+'>td>a').removeAttr('onClick');
        $('#zefEntry'+id+'>td').css( "color", "#FFF" );
    }
    $.post(ts_ext_path + "processor.php", { axAction: "stop", axValue: 0, id: 0 },
        function(data) {
            if (data == 1) {
                ts_ext_reloadAllTables();
            } else {
                alert("~~an error occured!~~")
            }
        }
    );
}


// ----------------------------------------------------------------------------------------
// delete a timesheet record immediately
//
function quickdelete(id) {
    $('#zefEntry'+id+'>td>a').blur();
    $('#zefEntry'+id+'>td>a').removeAttr('onClick');
    $('#zefEntry'+id+'>td>a.quickdelete>img').attr("src","../skins/standard/grfx/loading13.gif");
    
    $.post(ts_ext_path + "processor.php", { axAction: "quickdelete", axValue: 0, id: id },
        function(data){
            if (data == 1) {
                ts_ext_reloadAllTables();
            } else {
                alert("~~an error occured!~~")
            }
        }
    );
}

// ----------------------------------------------------------------------------------------
// edit a timesheet record
//
function editRecord(id) {
    floaterShow(ts_ext_path + "floaters.php","add_edit_record",0,id,700,600);
}



// ----------------------------------------------------------------------------------------
// pastes the current date and time in the outPoint field of the
// change dialog for timesheet entries 
//
//         $tpl->assign('pasteValue', date("d.m.Y - H:i:s",$kga['now']));
//
function pasteNow(value) {
    $('a').blur();
    
    now = new Date();

    H = now.getHours();
    i = now.getMinutes();
    s = now.getSeconds();
    
    if (H<10) H = "0"+H;
    if (i<10) i = "0"+i;
    if (s<10) s = "0"+s;
    
    time  = H + ":" + i + ":" + s;
    
    $("#edit_out_time").val(time);
}


// ----------------------------------------------------------------------------------------
//  Live Filter by The One And Only T.C. (TOAOTC) - THX - WOW! ;)
// 
function filter_lists(div_list, needle) {
   var n = new RegExp(needle, 'i');
   $('#'+div_list+' tr ').filter(function(index) {
       return ($(this).children('td:nth-child(2)').text().match(n) === null);
   }).css('display','none');
   $('#'+div_list+' tr ').filter(function(index) {
       return ($(this).children('td:nth-child(2)').text().match(n) !== null);
   }).css('display','');
}


function ts_knd_prefilter(knd,type) {
    $('a').blur();
    if (type=="highlight") {
        
        $(".knd").removeClass("filterPctForPreselection");
        $(".pct").removeClass("filterPctForPreselection");
        $("#pct .knd"+knd).addClass("filterPctForPreselection");
        $("#pct .pct").removeClass("TableRowInvisible");

        
    } else {
        
        $(".knd").removeClass("filterPctForPreselection");      
        $(".pct").removeClass("filterPctForPreselection");
        $("#knd .knd"+knd).addClass("filterPctForPreselection");
        $("#pct .pct").addClass("TableRowInvisible");
        $("#pct .pct").removeClass("highlightPctForPreselection");
        $("#pct .knd"+knd).removeClass("TableRowInvisible");
        
    }
}


// ----------------------------------------------------------------------------------------
//  table row changes color on rollover - preselection link on whole row
//
function ChangeColor(tableRow,highLight) {
  if (highLight) {
    $(tableRow).parents("tr").addClass("highlightPctForPreselection");
  } else {
    $(tableRow).parents("tr").removeClass("highlightPctForPreselection");
  }
}


// ----------------------------------------------------------------------------------------
// filters project and task fields in add/edit record dialog

function ts_filter_selects(id, needle) {
	var n = new RegExp(needle, 'i');
	
	// cache initialisieren
	if(typeof window['__cacheselect_'+id] == "undefined") {
		window['__cacheselect_'+id] = [];
		$('#'+id+' option ').each(function(index) {
			window['__cacheselect_'+id].push({
				'value':$(this).val()
				, 'text':$(this).text()
			})
		})
	}
	
	$('#'+id).removeOption(/./);
	
	var i, cs = window['__cacheselect_'+id];
	for(i=0; i<cs.length; ++i) {
		if(cs[i].text.match(n) !== null) $('#'+id).addOption(cs[i].value, cs[i].text);
	}
}







/*


// ----------------------------------------------------------------------------------------
// creates empty new timesheet entry
//
function add_zef() {
    alert('neuen eintrag manuell anlegen');
}



// temporary function for customer filter
// 16.07.07
function filter(id) {
    $.post("processor.php", { ax: "filter", id: id }, 
        function() {
            ts_ext_reloadSubject('knd');
        }
    );
}


*/
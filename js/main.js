// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[id^="content-"]').forEach((content, index) => {
        const toggle = document.getElementById(`toggle-${index}`);

        // 初始化时应用折叠样式
        content.classList.add('content-collapse');

        // 克隆和测量代码保持不变
        const clone = content.cloneNode(true);
        clone.style.cssText = 'position: absolute; visibility: hidden; height: auto; width: ' + content.clientWidth + 'px;';
        document.body.appendChild(clone);

        const fullHeight = clone.offsetHeight;
        const currentHeight = content.offsetHeight;

        // 如果完整高度大于当前高度，显示“全文”按钮
        if (fullHeight > currentHeight) {
            toggle.classList.remove('hidden');
        }

        document.body.removeChild(clone);
    });
});


function toggleContent(index) {
    const content = document.getElementById('content-' + index);
    const toggle = document.getElementById('toggle-' + index);

    if (content.classList.contains('content-collapse')) {
        content.classList.remove('content-collapse');
        content.classList.add('expand'); // 确保可以完全展开
        toggle.textContent = '收起';
    } else {
        content.classList.remove('expand');
        content.classList.add('content-collapse');
        toggle.textContent = '全文';
    }
}


// 处理操作按钮的点击事件
function handleAction(action, index) {
    if (action === 'save') {
        console.log('点击了暂存按钮');
        // 在这里添加暂存功能的处理逻辑
    } else if (action === 'comment') {
        console.log('点击了评论按钮');
        // 在这里添加评论功能的处理逻辑
    }

    // 处理完后隐藏菜单
    document.getElementById(`actions-${index}`).classList.add('hide');
}


function toggleActions(index) {
    const actionsElement = document.getElementById(`actions-${index}`);
    const isHidden = actionsElement.classList.contains('hide');

    if (isHidden) {
        showActions(index);
    } else {
        hideActions(index);
    }
}

function showActions(index) {
    const actionsElement = document.getElementById(`actions-${index}`);
    actionsElement.classList.remove('hide');
    // 强制重绘，确保过渡效果生效
    void actionsElement.offsetWidth;
    actionsElement.classList.remove('opacity-0', 'scale-x-0');
    actionsElement.classList.add('opacity-100', 'scale-x-100');
}

function hideActions(index) {
    const actionsElement = document.getElementById(`actions-${index}`);
    actionsElement.classList.remove('opacity-100', 'scale-x-100');
    actionsElement.classList.add('opacity-0', 'scale-x-0');

    // 延迟添加 'hide' 类，确保过渡动画完成
    setTimeout(() => {
        actionsElement.classList.add('hide');
    }, 300); // 与过渡持续时间一致
}

// 监听整个文档的点击事件
document.addEventListener('click', (event) => {
    const target = event.target;
    const actionsElements = document.querySelectorAll('[id^="actions-"]');

    actionsElements.forEach((actionsElement) => {
        const index = actionsElement.id.split('-')[1];
        const buttonElement = document.getElementById(`show-actions-button-${index}`);

        if (!actionsElement.contains(target) && !buttonElement.contains(target)) {
            hideActions(index);
        }
    });
});